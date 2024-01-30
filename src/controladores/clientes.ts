import { Request, Response } from 'express'
import { knex } from '../conexao'
import bcrypt from 'bcrypt'

export const cadastrarCliente = async (req: Request, res: Response) => {
    const { nome, email, cpf } = req.body

    try {
        const novoUsuario = await knex('clientes').insert({ nome, email, cpf }).returning('*')

        return res.status(201).json(novoUsuario)
    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor." })
    }
}