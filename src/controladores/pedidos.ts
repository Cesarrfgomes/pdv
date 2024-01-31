import { Request, Response } from 'express'
import { knex } from '../conexao'
import { juntarPedidos } from '../utilidades/juntarPedidos'

export const cadastrarPedido = async (req: Request, res: Response) => {
    const { cliente_id, observacao, pedido_produtos } = req.body

    try {
        const clienteExiste = await knex('clientes').where({ id: cliente_id }).first()

        if (!clienteExiste) {
            return res.status(404).json({ mensagem: "Cliente não encontrado." })
        }

        const pedidosJuntos: any = juntarPedidos(pedido_produtos)

        let valorTotal = 0

        const novoPedido: any = {
            cliente_id,
            observacao,
            pedido_produtos: []
        }

        for (const produto of pedidosJuntos) {
            const produtoExiste = await knex('produtos').where({ id: produto.produto_id }).first()

            if (!produtoExiste) {
                return res.status(404).json({ mensagem: "Produto não encontrado" })
            }

            if (produto.quantidade_produto > produtoExiste.quantidade_estoque) {
                return res.status(400).json({ mensagem: "Quantidade insuficiente" })
            }

            valorTotal += produtoExiste.valor * produto.quantidade_produto

            novoPedido.pedido_produtos.push({
                produto_id: produto.produto_id,
                quantidade_produto: produto.quantidade_produto
            })
        }

        const cadastrarPedido = await knex('pedidos').insert({ cliente_id, observacao, valor_total: valorTotal }).returning('id')

        for (const produto of pedidosJuntos) {

            const produtoExiste = await knex('produtos').where({ id: produto.produto_id }).first()

            await knex('pedido_produtos').insert({
                pedido_id: cadastrarPedido[0].id,
                produto_id: produtoExiste.id,
                quantidade_produto: produto.quantidade_produto,
                valor_produto: produtoExiste.valor
            })
        }

        return res.status(201).json(novoPedido)

    } catch (error) {
        console.log(error)
        return res.status(500).json({ mensagem: "Erro interno do servidor." })
    }
}

export const listarPedidos = async (req: Request, res: Response) => {
    const { cliente_id } = req.query;

    try {
        let pedidos = [];

        if (cliente_id) {
            const clienteExiste = await knex('clientes').where({ id: cliente_id }).first();

            if (!clienteExiste) {
                return res.status(404).json({ mensagem: 'Cliente não encontrado!' });
            }

            pedidos = await knex('pedidos').where({ cliente_id });
        } else {
            pedidos = await knex('pedidos');
        }

        const resultado = [];

        for (const pedido of pedidos) {
            const produtosPedido = await knex('pedido_produtos')
                .where('pedido_produtos.pedido_id', pedido.id);

            resultado.push({ pedido, pedido_produtos: produtosPedido });
        }

        return res.status(200).json(resultado);
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno no servidor.' });
    }
}