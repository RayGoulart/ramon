const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const rotasprodutos = require('./rotas/rotas-produtos');
const rotascliente = require('./rotas/rotas-clientes')
const rotas_autenticacao = require('./rotas/rotas-autenticacao') //importando

app.use(bodyParser.json());
app.use('/produtos', rotasprodutos); // Alterado para prefixar as rotas com '/produtos'
app.use('/clientes', rotascliente)
app.use('/auth', rotas_autenticacao)


//Iniciar o servidor
const port = 8000; // Ajuste a porta conforme necessário
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});

module.exports = app;