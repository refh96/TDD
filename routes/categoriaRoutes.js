const express = require('express')
const mongoose = require('mongoose');
const categoriaController = require('../controllers/categoriaController')
const api = express.Router();

api.post('/categoria/:id', categoriaController.createCategoria);
api.get('/categorias', categoriaController.getCategorias);
api.put('/categoria/update/:id', categoriaController.updateCategoria);
api.delete('/categoria/delete/:id', categoriaController.deleteCategoria);
api.get('/categoria/search/:id', categoriaController.getCategoria);
module.exports = api