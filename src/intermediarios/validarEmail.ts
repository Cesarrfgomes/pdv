import { Request, Response, NextFunction } from 'express'
import { knex } from '../conexao'

export const validarEmail = async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body

    try {
        const emailExiste = await knex('clientes').where({ email })

        if (emailExiste.length > 0) {
            return res.status(400).json({ mensagem: "Esse email já está em uso." })
        }

        next()
    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor." })
    }
}

export const validarEmailEmUso = async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body
    const { id } = req.params

    try {
        const clienteExiste = await knex('clientes').where({ id }).first()

        if (!clienteExiste) {
            return res.status(404).json({ mensagem: "Cliente não encontrado." })
        }

        if (email !== clienteExiste.email) {
            const emailExiste = await knex('clientes').where({ email }).first()

            if (emailExiste) {
                return res.status(400).json({ mensagem: "Email já está em uso." })
            }
        }

        next()
    } catch (error) {
        return res.status(500).json({ mensagem: "Erron interno do servidor." })
    }
}

