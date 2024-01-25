import jwt, { JwtPayload } from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import { knex } from '../conexao'

const senhaSecreta: string = process.env.SENHA_JWT as string

export interface usuarioId extends JwtPayload {
    id: number;
}

export const validarToken = async (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers

    try {
        const token = authorization?.replace('Bearer ', '');

        if (!token) {
            return res.status(403).json({ mensagem: "Acesso negado." })
        }

        const { id } = <usuarioId>jwt.verify(token, senhaSecreta);

        const usuarioLogado = await knex('usuarios').where({ id }).first()

        if (!usuarioLogado) {
            return res.status(404).json({ mensagem: "Não autorizado." })
        }

        const { senha: _, ...usuario } = usuarioLogado

        req.usuario = usuario

        next();
    } catch (error) {
        console.log(error)
        return res.status(500).json({ mensagem: "Erron interno do sevirdor." })
    }
}