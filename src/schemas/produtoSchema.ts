import joi from 'joi'

export const validarCadastroProduto = joi.object({
    descricao: joi.string().required().messages({
        'string.empty': 'O campo descrição é obrigatório!',
        'any.required': 'O campo descrição é obrigatório!'
    }),
    quantidade_estoque: joi.number().integer().positive().required().messages({
        'number.base': 'O campo quantidade_estoque é numérico e obrigatório!'
    }),
    valor: joi.number().integer().required().positive().required().messages({
        'number.base': 'O campo valor é numérico e obrigatório!'
    }),
    categoria_id: joi.number().integer().required().messages({
        'number.base': 'O campo categoria é numérico e obrigatório!'
    })
}).unknown(true)