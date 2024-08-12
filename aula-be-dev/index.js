const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

app.use(bodyParser.json());

const dbPath = './db.json';

// Função para ler a base de dados
function readDB() {
    return JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
}

// Listar todos os produtos
app.get('/produtos', function (req, res) {
    const produtos = readDB().produtos;
    res.json(produtos);
});

// Listar um produto específico
app.get('/produtos/:id', function (req, res) {
    const _id = req.params.id;
    const lista_produtos = readDB().produtos;
    const produto = lista_produtos.find((produto) => produto.id === _id);
    produto ? res.json(produto) : res.status(404).send({ error: 'Not found' });
});

// Criar um novo produto
app.post('/produtos', function (req, res) {
    const dados = req.body;
    if (!dados.nome || !dados.preco) {
        return res.status(406).send({ error: 'Nome e preço devem ser informados' });
    }
    const _id = uuidv4();
    dados.id = _id;

    const db = readDB();
    db.produtos.push(dados);
    fs.writeFile(dbPath, JSON.stringify(db), (err) => {
        if (err) {
            return res.status(500).send({ error: 'Erro no servidor' });
        }
        res.json(dados);
    });
});

// Atualizar um produto específico
app.put('/produtos/:id', function (req, res) {
    const _id = req.params.id;
    const novosDados = req.body;
    const db = readDB();
    const produtoIndex = db.produtos.findIndex((produto) => produto.id === _id);

    if (produtoIndex === -1) {
        return res.status(404).send({ error: 'Produto não encontrado' });
    }

    db.produtos[produtoIndex] = { ...db.produtos[produtoIndex], ...novosDados };
    fs.writeFile(dbPath, JSON.stringify(db), (err) => {
        if (err) {
            return res.status(500).send({ error: 'Erro no servidor' });
        }
        res.json(db.produtos[produtoIndex]);
    });
});

// Deletar um produto específico
app.delete('/produtos/:id', function (req, res) {
    const _id = req.params.id;
    const db = readDB();
    const produtoIndex = db.produtos.findIndex((produto) => produto.id === _id);

    if (produtoIndex === -1) {
        return res.status(404).send({ error: 'Produto não encontrado' });
    }

    db.produtos.splice(produtoIndex, 1);
    fs.writeFile(dbPath, JSON.stringify(db), (err) => {
        if (err) {
            return res.status(500).send({ error: 'Erro no servidor' });
        }
        res.status(204).send(); // No content
    });
});

app.listen(8000, () => {
    console.log('Servidor rodando na porta 8000');
});
