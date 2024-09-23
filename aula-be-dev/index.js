require('dotenv').config()
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const rotasprodutos = require('./rotas/rotas-produtos');
const rotascliente = require('./rotas/rotas-clientes')
const rotas_autenticacao = require('./rotas/rotas-autenticacao') //importando
const cookieParser = require('cookie-parser')

const swaggerUi = require("swagger-ui-express")
const YAML = require('yamljs')
const swaggerDocument = YAML.load('./docs/documentacao.yaml')

app.use(bodyParser.json());
app.use(cookieParser())

app.use('/produtos', rotasprodutos); // Alterado para prefixar as rotas com '/produtos'
app.use('/clientes', rotascliente)
app.use('/auth', rotas_autenticacao)

app.use('/api-docs',swaggerUi.serve, swaggerUi.setup(swaggerDocument))


//Iniciar o servidor
const port = 8000; // Ajuste a porta conforme necessário
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});

module.exports = app;