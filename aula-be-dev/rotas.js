const express = require('express');
const router = express.Router()
const controlador = require('./controlador')

router.get('', controlador.listProdutos)
router.get('/:id', controlador.getProdutos)
router.post('/', controlador.createProdutos)
router.post('/:id', controlador.deleteProdutos)
router.delete('/produtos/', controlador.uptadeProdutos )

module.exports = router;