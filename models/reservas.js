const mongoose = require('mongoose');
const categoria = require('./categoria');

const Schema = mongoose.Schema;

const reservaSchema = new Schema({
  clienteId: {
    type: Schema.ObjectId,
    required: true,
    ref: 'clientes'
  },
  servicioId: {
    type: Schema.ObjectId,
    required: true,
    ref: 'servicios'
  },
  fecha:{
    type: Date,
    required: true
  },
  categoria:{
    type:[Schema.ObjectId],
    ref: categoria
}
});

module.exports = mongoose.model('reserva', reservaSchema)
