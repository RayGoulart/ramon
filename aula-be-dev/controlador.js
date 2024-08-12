const db = require('./db.json')
const {v4: uuid} = require ('uuid')
const fs = require('fs')


const listProdutos = async (req, res) => {
    try {
        const produtos = (await readDB()).produtos;
        res.json(produtos);
    } catch (err) {
        res.status(500).send({ error: 'Erro no servidor' });
    }
};

const getProdutos =  async (req, res) => {
    const id = parseInt(req.params.id, 10); // Converter para número
    try {
        const lista_produtos = (await readDB()).produtos;
        const produto = lista_produtos.find((produto) => produto.id === id); // Comparar como número
        produto ? res.json(produto) : res.status(404).send({ error: 'Not found' });
    } catch (err) {
        res.status(500).send({ error: 'Erro no servidor' });
    }
};

// Criar um novo produto
const createProdutos =  async (req, res) => {
    const dados = req.body;
    if (!dados.nome || !dados.preco) {
        return res.status(406).send({ error: 'Nome e preço devem ser informados' });
    }
    try {
        const db = await readDB();
        const id = db.produtos.length > 0 ? db.produtos[db.produtos.length - 1].id + 1 : 1; // Gerar ID numérico
        dados.id = id;

        db.produtos.push(dados);
        await fs.writeFile(dbPath, JSON.stringify(db, null, 2));
        res.json(dados);
    } catch (err) {
        res.status(500).send({ error: 'Erro no servidor' });
    }
};

// Atualizar um produto específico
const uptadeProdutos = async (req, res) => {
    const id = parseInt(req.params.id, 10); // Converter para número
    const novosDados = req.body;
    try {
        const db = await readDB();
        const produtoIndex = db.produtos.findIndex((produto) => produto.id === id); // Comparar como número

        if (produtoIndex === -1) {
            return res.status(404).send({ error: 'Produto não encontrado' });
        }

        db.produtos[produtoIndex] = { ...db.produtos[produtoIndex], ...novosDados };
        await fs.writeFile(dbPath, JSON.stringify(db, null, 2));
        res.json(db.produtos[produtoIndex]);
    } catch (err) {
        res.status(500).send({ error: 'Erro no servidor' });
    }
};

// Deletar um produto específico
const deleteProdutos = async (req, res) => {
    const id = parseInt(req.params.id, 10); // Converter para número
    try {
        const db = await readDB();
        const produtoIndex = db.produtos.findIndex((produto) => produto.id === id); // Comparar como número

        if (produtoIndex === -1) {
            return res.status(404).send({ error: 'Produto não encontrado' });
        }

        db.produtos.splice(produtoIndex, 1);
        await fs.writeFile(dbPath, JSON.stringify(db, null, 2));
        res.status(204).send(); // No content
    } catch (err) {
        res.status(500).send({ error: 'Erro no servidor' });
    }
};

module.exports = {listProdutos, getProdutos, createProdutos,uptadeProdutos,
    deleteProdutos }