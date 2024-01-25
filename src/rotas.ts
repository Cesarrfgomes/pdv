import { Router, Request, Response } from 'express'
import { cadastrarUsuario, detalharPerfil, editarPerfil } from './controladores/usuarios'
import { login } from './controladores/login'
import { listarCategorias } from './controladores/categorias'
import { validarToken } from './intermediarios/validarToken'

const rotas = Router()

rotas.post('/login', login)

rotas.post('/usuario', cadastrarUsuario)

rotas.get('/categoria', listarCategorias)

rotas.use(validarToken)

rotas.get('/usuario', detalharPerfil)

rotas.put('/usuario', editarPerfil)



export default rotas