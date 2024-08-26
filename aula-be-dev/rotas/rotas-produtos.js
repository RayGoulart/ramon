const express = require('express');
const router = express.Router();
const controlador = require('../controladores/controlador_produtos');

//rotas para produtos
router.get('/', controlador.listProdutos);
router.get('/:id', controlador.getProduto);
router.post('/', controlador.createProduto);
router.put('/:id', controlador.updateProduto); // Alterado para PUT
router.delete('/:id', controlador.deleteProduto); // Corrigido

module.exports = router;


