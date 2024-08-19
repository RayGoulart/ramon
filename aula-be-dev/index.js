const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const rotas = require('./rotas');

app.use(bodyParser.json());
app.use('/produtos', rotas); // Alterado para prefixar as rotas com '/produtos'

// Iniciar o servidor
const port = 8000; // Ajuste a porta conforme necessário
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
