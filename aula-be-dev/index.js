const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs').promises;

app.use(bodyParser.json());

const dbPath = './db.json';

// Função para ler a base de dados
async function readDB() {
    try {
        const data = await fs.readFile(dbPath, 'utf-8');
        return JSON.parse(data);
    } catch (err) {
        throw new Error('Erro ao ler a base de dados');
    }
}


// Iniciar o servidor
const port = 8000; // Ajuste a porta conforme necessário
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
