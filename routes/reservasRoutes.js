const express = require('express')
const mongoose = require('mongoose');
const reservasController = require('../controllers/reservasControllers')
const api = express.Router();

api.post('/reserva', reservasController.createReservas);
api.get('/reservas', reservasController.getReservas);
api.put('/reserva/update/:id', reservasController.updateReserva);
api.delete('/reserva/delete/:id', reservasController.deleteReserva);
api.get('/reserva/search/:id', reservasController.getReserva);
module.exports = api