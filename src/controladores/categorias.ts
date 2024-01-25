import { Request, Response } from 'express'
import { knex } from '../conexao'

export const listarCategorias = async (req: Request, res: Response) => {
    try {
        const listarCategorias = await knex('categorias')

        return res.status(200).json(listarCategorias)
    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor." })
    }
} 