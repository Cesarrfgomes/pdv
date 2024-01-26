import { Router, Request, Response } from 'express'
import { cadastrarUsuario, detalharPerfil, editarPerfil } from './controladores/usuarios'
import { login } from './controladores/login'
import { listarCategorias } from './controladores/categorias'
import { validarToken } from './intermediarios/validarToken'
import { validarCorpoRequisicao } from './intermediarios/validarCampo'
import { verificarLogin } from './schemas/loginSchema'
import { verificarCadastroUsuario } from './schemas/usuarioSchema'
import { validarCadastroProduto } from './schemas/produtoSchema'
import { atualizarProduto, cadastrarProduto } from './controladores/produtos'

const rotas = Router()

rotas.post('/login', validarCorpoRequisicao(verificarLogin), login)

rotas.post('/usuario', validarCorpoRequisicao(verificarCadastroUsuario), cadastrarUsuario)

rotas.get('/categoria', listarCategorias)

rotas.use(validarToken)

rotas.get('/usuario', detalharPerfil)

rotas.put('/usuario', editarPerfil)

rotas.post('/produto', validarCorpoRequisicao(validarCadastroProduto), cadastrarProduto)

rotas.put('/produto/:id', validarCorpoRequisicao(validarCadastroProduto), atualizarProduto)



export default rotas