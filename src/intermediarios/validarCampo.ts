import { Request, Response, NextFunction } from 'express'

export const validarCorpoRequisicao = (validacaoJoi: any) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        await validacaoJoi.validateAsync(req.body);
        next();
    } catch (error) {
        console.log(error)
        return res.status(500).json({ mensagem: `${error}` })
    }
};