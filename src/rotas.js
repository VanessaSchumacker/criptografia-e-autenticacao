const express = require('express')
const {
	listarCarros,
	detalharCarro,
	cadastrarCarro,
	atualizarCarro,
	excluirCarro,
} = require('./controladores/carros')

const { cadastrarUsuario, login, obterPerfil } = require('./controladores/usuarios')
const verificarUsuariologado = require('./intermediarios/autenticacao')

const rotas = express()

rotas.post('/usuario', cadastrarUsuario)
rotas.post('/login', login)

rotas.use(verificarUsuariologado)

rotas.get('/perfil', obterPerfil)

rotas.get('/carro',listarCarros)
rotas.get('/carro/:id',detalharCarro)
rotas.post('/carro',cadastrarCarro)
rotas.put('/carro/:id',atualizarCarro)
rotas.delete('/carro/:id',excluirCarro)

module.exports = rotas