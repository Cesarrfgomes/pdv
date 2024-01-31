import { Request, Response, NextFunction } from 'express'
import { knex } from '../conexao'

export const validarEmail = (usuarioCliente: string) => async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body

    try {
        const emailExiste = await knex(usuarioCliente).where({ email }).first()

        if (emailExiste) {
            return res.status(400).json({ mensagem: "Esse email já está em uso." })
        }

        next()
    } catch (error) {
        console.log(error)
        return res.status(500).json({ mensagem: "Erro interno do servidor." })
    }
}

export const validarEmailEmUso = (usuarioCliente: string) => async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body
    const { id } = req.params

    try {
        const usuarioExistente = await knex(usuarioCliente)
            .where({ email })
            .whereNot({ id })
            .first();

        if (usuarioExistente) {
            return res.status(400).json({
                mensagem: "O e-mail já está sendo usado por outro usuário.",
            });
        }

        next()
    } catch (error) {
        return res.status(500).json({ mensagem: "Erron interno do servidor." })
    }
}

