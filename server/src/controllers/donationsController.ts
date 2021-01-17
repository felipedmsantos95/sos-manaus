import { Request, Response } from 'express';
import db from '../database/connection';

interface Donations {
    name_cause: string,
    whatsapp: string,
    cause: string,
    user_id: string
}

export default class DonationsController {
    async indexAll(request: Request, response: Response) {
        const donations = await db('donations')
            .whereExists(function () {
                this.select('donations.*')
                    .from('donations')
            })
        
        console.log(donations);

        return response.send(donations)
    }

    async index(request: Request, response: Response) {
        const user_id = request.headers.authorization

        const donations = await db('donations')
                                .where('user_id', user_id)
                                .select('*')
        
        console.log(donations);

        return response.send(donations)
    }

    async create(request: Request, response: Response) {
        const {
            name_cause,
            whatsapp,
            cause,
        } = request.body;

        const user_id = request.headers.authorization;

        const user = await db('users')
                                .where('id', user_id)
                                .select('*')
                                .first()

        
        if(!user){
            return response.status(400).json({
                error: 'Não há autorização para executar esta ação'
            })
        }

        const trx = await db.transaction();
        try {
            
            await trx('donations').insert({
                name_cause,
                whatsapp,
                cause,
                user_id
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

    async edit(request: Request, response: Response) {
        const { id } = request.params
        const user_id = request.headers.authorization
		const { 
                name_cause,
                whatsapp,
                cause, 
            } = request.body

		
        const donation = await db('donations')
                                .where('id', id)
                                    .update({
                                        name_cause,
                                        whatsapp,
                                        cause,
                                    })

        if(!donation)
            return response.status(400).json({error: "Não existe uma causa com o id informado"})                                
                                
		return response.status(201).json({ id })

    };

    async delete(request: Request, response: Response) {
		const { id } = request.params
        const user_id = request.headers.authorization
        

        const donation: Donations[] = await db('donations')
                                .whereExists(function () {
                                    this.where('id', id)
								        .select('user_id')
								        .first()
                                })
								

		if (donation[0].user_id != user_id)
			return response.status(401).json({error: 'Não há autorização para executar esta ação'})
		
		await db('donations').where('id', id).delete()

		return response.status(204).send()

	}
}
