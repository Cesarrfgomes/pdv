import joi from 'joi'

export const validarCadastroPedido = joi.object({
    cliente_id: joi.number().positive().integer().required(),
    pedido_produtos: joi.array().required(),
    observacao: joi.string()
})