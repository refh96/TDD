const express = require('express')
const mongoose = require('mongoose');
const clientesController = require('../controllers/clientesController')
const api = express.Router();

api.post('/cliente/:id', clientesController.createCliente);
api.get('/clientes', clientesController.getClientes);
api.put('/cliente/update/:id', clientesController.updateCliente);
api.delete('/cliente/delete/:id', clientesController.deleteCliente);
api.get('/cliente/search/:id', clientesController.getCliente);
module.exports = api