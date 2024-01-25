import { Request, Response } from 'express'
import { knex } from '../conexao'
import bcrypt from 'bcrypt'

export const cadastrarUsuario = async (req: Request, res: Response) => {
    const { nome, email, senha } = req.body

    try {
        const senhaCriptografada = await bcrypt.hash(senha, 10)

        const cadastro = await knex('usuarios').insert({ nome, email, senha: senhaCriptografada }).returning('*')

        return res.status(201).json(cadastro)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ mensagem: "Erro interno do servidor." })
    }
}

export const detalharPerfil = async (req: Request, res: Response) => {
    const { id } = req.usuario

    try {
        const detalharPerfil = await knex('usuarios').where({ id }).first()

        return res.status(200).json(detalharPerfil)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ mensagem: "Erro interno do servidor." })
    }
}

export const editarPerfil = async (req: Request, res: Response) => {
    const { nome, email, senha } = req.body
    const { id } = req.usuario

    try {
        const usuarioExistente = await knex("usuarios")
            .where({ email })
            .whereNot({ id })
            .first();

        if (usuarioExistente) {
            return res.status(400).json({
                mensagem: "O e-mail já está sendo usado por outro usuário.",
            });
        }

        const senhaCriptografada = await bcrypt.hash(senha, 10)

        await knex('usuarios').update({ nome, email, senha: senhaCriptografada }).where({ id })

        return res.status(204).json()
    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor." })
    }
}