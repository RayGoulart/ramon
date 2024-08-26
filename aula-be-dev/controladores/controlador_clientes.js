const db = require('../db.json');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const bcryptjs =  require('bcryptjs')

//listar todos os clientes
const listCliente =  async (req, res) => {
    const clientes = db.clientes;
    res.json(clientes);
}

//listar cliente especifico
const getCliente = async (req, res) => {
    const _id = req.params.id
    
    const clientes = db.clientes.find(clientes => clientes.id == _id);
    clientes ? res.json(clientes) : res.status(404).json({ error: 'not found' });
}

//criar produto
const createCliente = async (req, res) => {
    const dados = req.body;
    if (!dados.nome || !dados.email) {
        return res.status(406).json({ error: 'Nome e email devem ser informados' });
    }
    const _id = uuidv4();
    const senhaCriptografada = await bcryptjs.hashSync(dados.senha, 10)
    dados.senha = senhaCriptografada
    dados.id = _id;
    db.clientes.push(dados);
    fs.writeFile('./db.json', JSON.stringify(db), err => {
        if (err) {
            return res.status(500).json({ error: 'erro no servidor' });
        }
    });
    res.status(201).json(dados); 
}

//atualizar produto 
const updateCliente = async (req, res) => {
    const _id = req.params.id;
    const dados = req.body;
    const index = db.clientes.findIndex(clientes => clientes.id == _id);
    if (index === -1) {
        return res.status(404).json({ error: 'not found' });
    }
    db.clientes[index] = { ...db.clientes[index], ...dados };
    fs.writeFile('./db.json', JSON.stringify(db), err => {
        if (err) {
            return res.status(500).json({ error: 'erro no servidor' });
        }
    });
    res.json(db.clientes[index]); 
}

//deletar clientes
const deleteCliente = async (req, res) => {
    const _id = req.params.id;
    const index = db.clientes.findIndex(clientes => clientes.id === _id);
    if (index === -1) {
        return res.status(404).json({ error: 'not found' });
    }
    db.clientes.splice(index, 1);
    fs.writeFile('./db.json', JSON.stringify(db), err => {
        if (err) {
            return res.status(500).json({ error: 'erro no servidor' });
        }
    });
    res.status(204).send(); // Retorna status 204 sem conteúdo
};

module.exports = { listCliente, getCliente, createCliente, updateCliente, deleteCliente };