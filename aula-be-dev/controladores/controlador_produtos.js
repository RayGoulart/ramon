const db = require('../db.json');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

//listar todos os produtos
const listProdutos = async (req, res) => {
    const produtos = db.produtos;
    res.json(produtos);
};

//listar um produto especifico
const getProduto = async (req, res) => {
    // Converte o ID da URL para número
    
    const _id = req.params.id

    // Encontra o produto pelo ID
    const produto = db.produtos.find(produto => produto.id == _id);
    

    // Retorna o produto encontrado ou um erro 404 se não encontrado
    produto ? res.json(produto) : res.status(404).json({ error: 'not found' });
};

// criar produto
const createProduto = async (req, res) => {
    const dados = req.body;
    if (!dados.nome || !dados.preco) {
        return res.status(406).json({ error: 'Nome e preço devem ser informados' });
    }
    const _id = uuidv4();
    dados.id = _id;
    db.produtos.push(dados);
    fs.writeFile('./db.json', JSON.stringify(db), err => {
        if (err) {
            return res.status(500).json({ error: 'erro no servidor' });
        }
    });
    res.status(201).json(dados); 
};

// atualizar produto
const updateProduto = async (req, res) => {
    const _id = req.params.id;
    const dados = req.body;
    const index = db.produtos.findIndex(produto => produto.id == _id);
    if (index === -1) {
        return res.status(404).json({ error: 'not found' });
    }
    db.produtos[index] = { ...db.produtos[index], ...dados };
    fs.writeFile('./db.json', JSON.stringify(db), err => {
        if (err) {
            return res.status(500).json({ error: 'erro no servidor' });
        }
    });
    res.json(db.produtos[index]); 
};

//deletar produto
const deleteProduto = async (req, res) => {
    const _id = req.params.id;
    const index = db.produtos.findIndex(produto => produto.id === _id);
    if (index === -1) {
        return res.status(404).json({ error: 'not found' });
    }
    db.produtos.splice(index, 1);
    fs.writeFile('./db.json', JSON.stringify(db), err => {
        if (err) {
            return res.status(500).json({ error: 'erro no servidor' });
        }
    });
    res.status(204).send(); // Retorna status 204 sem conteúdo
};

module.exports = { listProdutos, getProduto, createProduto, updateProduto, deleteProduto };

