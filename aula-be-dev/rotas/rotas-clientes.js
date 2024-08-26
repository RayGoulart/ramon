const express = require('express');
const router = express.Router();
const controlador = require('../controladores/controlador_clientes');

//rotas para clientes
router.get('/', controlador.listCliente);
router.get('/:id', controlador.getCliente);
router.post('/', controlador.createCliente);
router.put('/:id', controlador.updateCliente); // Alterado para PUT
router.delete('/:id', controlador.deleteCliente); // Corrigido

module.exports = router;