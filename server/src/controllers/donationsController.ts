import { Request, Response } from 'express';
import db from '../database/connection';

export default class DonationsController {
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
            whatsapp,
            cause,
        } = request.body;

        const trx = await db.transaction();

        try {     
            await trx('users').insert({
                name,
                whatsapp,
                cause
            })

            await trx.commit();

            return response.status(201).send();
        } catch (err) {
            await trx.rollback();

            return response.status(400).json({
                error: 'Unexpected error while creating new class'
            })
        }
    };
}
