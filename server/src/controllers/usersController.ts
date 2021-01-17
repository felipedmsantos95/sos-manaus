import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import * as Utils from '../utils';
import db from '../database/connection';
import jwt from 'jwt-simple';


const authSecret = '89b2204f55f19a8f7ea19c6abbfa6da9'


export default class UsersController {
    async index(request: Request, response: Response) {
        const users = await db('users')
            .whereExists(function () {
                this.select('users.*')
                    .from('users')
            })
        
        console.log(users);

        return response.send(users)
    }

    async create(request: Request, response: Response) {
        const {
            name,
            email,
            password,
        } = request.body;

        const encryPassword = await bcrypt.hash(password.replace(/\s/g, ''), 10)

        //Verify if email already exists
        const user = await db('users')
            .whereRaw("LOWER(email) = LOWER(?)", Utils.parseEmail(email))
            .first()

        if(user)
            return response.status(400).json({
                error: 'Este email já está cadastrado'
            })

        const trx = await db.transaction();

        try {     
            await trx('users').insert({
                name: Utils.parseName(name),
                email: Utils.parseEmail(email),
                password: encryPassword
            })

            await trx.commit();

            return response.status(201).send();
        } catch (err) {
            await trx.rollback();

            return response.status(400).json({
                error: 'Aconteceu um erro inesperado'
            })
        }
    };

    async signin(request: Request, response: Response) {
        const email = request.body.email.toLowerCase().replace(/\s/g, '')

        const user = await db('users')
            .whereRaw("LOWER(email) = LOWER(?)", email)
            .first()
        
        if (user) {                            //To remove spaces
            bcrypt.compare((request.body.password).replace(/\s/g, ''), user.password, (err, isMatch) => {
                if (err || !isMatch) {
                    return response.status(400).json({error: 'Usuário ou senha incorretos'})
                }

                const payload = { user_id: user.id, email: user.email }

                let data = {
                    name: user.name,
                    email: user.email,
                    token: jwt.encode(payload, authSecret),
                }
                response.status(200).json(data)

            })
        } else {
             response.status(400).json({error: 'Usuário ou senha incorretos'})

        }

    };

}