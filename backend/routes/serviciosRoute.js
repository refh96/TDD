const express = require('express');
const mongoose = require('mongoose');
const servicioController = require('../controllers/serviciosController')
const api = express.Router();

api.post('/servicio', servicioController.createServicios);
api.get('/servicios', servicioController.getServicios);
api.put('/servicio/update/:id', servicioController.updateServicio);
api.delete('/servicio/delete/:id', servicioController.deleteServicio);
api.get('/servicio/search/:id', servicioController.getServicio);
module.exports= api