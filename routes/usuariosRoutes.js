const express = require('express')
const mongoose = require('mongoose');
const usuariosController = require('../controllers/usuariosControllers')
const api = express.Router();
api.post('/usuario', usuariosController.createUsuario);
api.get('/usuarios', usuariosController.getUsuarios);
api.put('/usuario/update/:id', usuariosController.updateUsuario);
api.delete('/usuario/delete/:id', usuariosController.deleteUsuario);
api.get('/usuario/search/:id', usuariosController.getUsuario);
api.post('/usuario/login', usuariosController.loginUsuario);
module.exports = api