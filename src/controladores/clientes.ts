import { Request, Response } from 'express'
import { knex } from '../conexao'


export const cadastrarCliente = async (req: Request, res: Response) => {
    const { nome, email, cpf } = req.body

    try {
        const novoUsuario = await knex('clientes')
            .insert({ nome, email, cpf })
            .returning('*')

        return res.status(201).json(novoUsuario)
    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor." })
    }
}

export const editarCliente = async (req: Request, res: Response) => {
    const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } = req.body
    const { id } = req.params

    try {
        await knex('clientes')
            .update({ nome, email, cpf, cep, rua, numero, bairro, cidade, estado })
            .where({ id })

        return res.status(204).json()
    } catch (error) {
        return res.status(500).json({ mensagem: "Erron interno do servidor." })
    }
}

export const listarClientes = async (req: Request, res: Response) => {
    try {
        const listarClientes = await knex('clientes')

        return res.status(200).json(listarClientes)
    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor." })
    }
}