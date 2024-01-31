import { Request, Response, NextFunction } from 'express'
import { knex } from '../conexao'

export const validarCpf = async (req: Request, res: Response, next: NextFunction) => {
    const { cpf } = req.body

    try {
        const cpfExiste = await knex('clientes').where({ cpf })

        if (cpfExiste.length > 0) {
            return res.status(400).json({ mensagem: "Esse cpf já está em uso." })
        }

        next()
    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor." })
    }
}

export const validarCpfEmUso = async (req: Request, res: Response, next: NextFunction) => {
    const { cpf } = req.body
    const { id } = req.params

    try {
        const clienteExiste = await knex('clientes').where({ id }).first()

        if (!clienteExiste) {
            return res.status(404).json({ mensagem: "Cliente não encontrado." })
        }

        if (cpf !== clienteExiste.cpf) {
            const cpfExiste = await knex('clientes').where({ cpf }).first()

            if (cpfExiste) {
                return res.status(400).json({ mensagem: "CPF já está em uso." })
            }
        }

        next()
    } catch (error) {
        return res.status(500).json({ mensagem: "Erron interno do servidor." })
    }
}
