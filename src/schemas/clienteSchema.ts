import joi from 'joi'

export const validarCadastroCliente = joi.object({
    nome: joi.string().required().messages({
        'string.empty': 'O campo nome é obrigatório!',
        'any.required': 'O campo nome é obrigatório!'
    }),
    email: joi.string().email().required().messages({
        'string.email': "Formato de email inválido.",
        'string.empty': 'O campo email é obrigatório!',
        'any.required': 'O campo email é obrigatório!'
    }),
    cpf: joi.string().min(11).max(11).required().messages({
        'string.min': "Formato de cpf inválido.",
        'string.max': "Formato de cpf inválido.",
        'string.empty': 'O campo cpf é obrigatório!',
        'any.required': 'O campo cpf é obrigatório!'
    }),
    cep: joi.string().min(0).max(8).messages({
        'string.max': "Formato de cep inválido.",
    })
}).unknown(true)