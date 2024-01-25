import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { knex } from '../conexao'

const senhaSecreta: string = process.env.SENHA_JWT as string

export const login = async (req: Request, res: Response) => {
    const { email, senha } = req.body

    try {
        const emailExiste = await knex('usuarios').where({ email }).first()

        if (!emailExiste) {
            return res.status(404).json({ mensagem: "As credenciais não coincidem" })
        }

        const senhaCorreta = await bcrypt.compare(senha, emailExiste.senha)

        if (!senhaCorreta) {
            return res.status(404).json({ mensagem: "As credenciais não coincidem" })
        }

        const token = jwt.sign({ id: emailExiste.id }, senhaSecreta, { expiresIn: '8h' })

        const { senha: _, ...usuario } = emailExiste

        return res.status(200).json({ usuario, token })
    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor." })
    }
}
