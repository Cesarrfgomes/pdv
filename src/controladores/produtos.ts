import { Request, Response } from 'express'
import { knex } from '../conexao'

export const cadastrarProduto = async (req: Request, res: Response) => {
    const { descricao, quantidade_estoque, valor, categoria_id } = req.body

    try {
        const categoriaExiste = await knex('categorias').where({ id: categoria_id }).first()

        if (!categoriaExiste) {
            return res.status(404).json({ mensagem: "Categoria não encontrada!" })
        }

        const novoProduto = await knex('produtos')
            .insert({ descricao, categoria_id, quantidade_estoque, valor })
            .returning('*')

        return res.status(201).json(novoProduto)
    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor." })
    }
}

export const atualizarProduto = async (req: Request, res: Response) => {
    const { descricao, quantidade_estoque, valor, categoria_id } = req.body
    const { id } = req.params

    try {
        const categoriaExiste = await knex('categorias').where({ id: categoria_id }).first()

        if (!categoriaExiste) {
            return res.status(404).json({ mensagem: "Categoria não encontrada!" })
        }

        await knex('produtos')
            .update({ descricao, categoria_id, quantidade_estoque, valor })
            .where({ id })

        return res.status(204).json()
    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor." })
    }
}