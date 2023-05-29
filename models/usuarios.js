const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usuarioSchema = new Schema({
  nombre: String,
  email: String,
  contraseña: String,
  rol: String,
  // ...otros campos relevantes...
});

const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;
