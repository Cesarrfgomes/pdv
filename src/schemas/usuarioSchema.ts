import joi from 'joi'

export const verificarCadastroUsuario = joi.object({
    nome: joi.string().required().messages({
        'string.empty': 'O campo nome é obrigatório!',
        'any.required': 'O campo nome é obrigatório'
    }),
    email: joi.string().email().required().messages({
        'string.email': "Formato de email inválido.",
        'string.empty': 'O campo email é obrigatório!',
        'any.required': 'O campo email é obrigatório'
    }),
    senha: joi.string().min(5).required().messages({
        'string.empty': 'O campo senha é obrigatório!',
        'string.min': 'É necessário no mínimo 5 caracteres para a senha',
        'any.required': 'O campo senha é obrigatório'
    }),
})