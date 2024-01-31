import { Router, Request, Response } from 'express'
import { cadastrarUsuario, detalharPerfil, editarPerfil } from './controladores/usuarios'
import { login } from './controladores/login'
import { listarCategorias } from './controladores/categorias'
import { validarToken } from './intermediarios/validarToken'
import { validarCorpoRequisicao } from './intermediarios/validarCampo'
import { verificarLogin } from './schemas/loginSchema'
import { verificarCadastroUsuario } from './schemas/usuarioSchema'
import { validarCadastroProduto } from './schemas/produtoSchema'
import { atualizarProduto, cadastrarProduto, detalharProduto, excluirProduto, listarProdutos } from './controladores/produtos'
import { cadastrarCliente, editarCliente, listarClientes } from './controladores/clientes'
import { validarCadastroCliente } from './schemas/clienteSchema'
import { validarEmail, validarEmailEmUso } from './intermediarios/validarEmail'
import { validarCpf, validarCpfEmUso } from './intermediarios/validarCpf'

const rotas = Router()

rotas.post('/login', validarCorpoRequisicao(verificarLogin), login)

rotas.post('/usuario', validarCorpoRequisicao(verificarCadastroUsuario), cadastrarUsuario)

rotas.get('/categoria', listarCategorias)

rotas.use(validarToken)

rotas.get('/usuario', detalharPerfil)

rotas.put('/usuario', editarPerfil)

rotas.post('/produto', validarCorpoRequisicao(validarCadastroProduto), cadastrarProduto)

rotas.put('/produto/:id', validarCorpoRequisicao(validarCadastroProduto), atualizarProduto)

rotas.get('/produto', listarProdutos)

rotas.get('/produto/:id', detalharProduto)

rotas.delete('/produto/:id', excluirProduto)

rotas.post('/cliente', validarEmail, validarCpf, validarCorpoRequisicao(validarCadastroCliente), cadastrarCliente)

rotas.put('/cliente/:id', validarEmailEmUso, validarCpfEmUso, validarCorpoRequisicao(validarCadastroCliente), editarCliente)

rotas.get('/cliente', listarClientes)

export default rotas