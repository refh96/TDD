const mongoose = require('mongoose');
const categoria = require('./categoria');

const Schema = mongoose.Schema;

const reservaSchema = new Schema({
  usuarioId: {
    type: Schema.ObjectId,
    required: true,
    ref: 'usuarios'
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
