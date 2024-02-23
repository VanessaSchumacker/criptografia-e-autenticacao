const pool = require('../conexao')
const bcrypt = require('bcrypt')

const cadastrarUsuario = async (req, res) => {
    const { nome, email, senha } = req.body

    try {
        const senhaCriptografada = await bcrypt.hash(senha, 10)


        const novoUsuario = await pool.query(
            'insert into usuario (nome, email, senha) values ($1, $2, $3) returning *',
            [nome, email, senhaCriptografada] 
        )

        return res.status(201).json(novoUsuario.rows[0])

    } catch (error) {
        return res.status(500).json({mensagem: 'Erro interno do Servidor'})
    }
}

const login = async (req, res) => {
    const { email, senha } = req.body

    try {
        const usuario = await pool.query('select * from usuario where email = $1', [email])

        if (usuario.rowCount < 1 ) {
            return res.status(404).json({ mensagem: 'Email ou senha inválido'})
        }

        const senhaValida = await bcrypt.compare(senha, usuario.rows[0].senha)

        if (!senhaValida) {
            return res.status(400).json({mensagem: 'Email ou senha inválido'})
        }

        return res.json({mensagem: 'Usuário autenticado'})
    } catch (error) {
        return res.status(500).json({mensagem: 'Erro interno do Servidor'})
    }
}

module.exports = {
    cadastrarUsuario,
    login
}