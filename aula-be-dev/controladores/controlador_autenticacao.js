const db = require('../db.json')
const lista_clientes = db.clientes
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const login = async (req, res) => {
    try{
        const {email, senha} = req.body
        if(!email || !senha){
            res.send({erro: 'email ou senha não enviado'})
        }

        const clientes = lista_clientes.find(
            (clientes) => clientes?.email == email
        )
        if(!clientes){
            res.status(404).send({error:'not found'})
        }

        const senhaValida = bcrypt.compareSync(senha, clientes.senha)
        if(!senhaValida){
            res.send({error:'a senha não é valida'})
        }

        const token = jwt.sign(
            {
                nome: clientes.nome,
                email: clientes.email,
                _id: clientes.id
            },
            'swt_secret_key',
            {expiresIn: 1000*60*60*24*365}
        )
        console.log(token)

        res.cookie("tokenAulaBE", token).res.send({message: 'ok'})
    }catch (e){
        console.log(e)
    }
}


module.exports = {login}