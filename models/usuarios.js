const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const usuarioSchema = new Schema({
    nombre:{
        type: String,
        required: true,
        minLength: 1,
        maxLength: 50
    },
    apellido:{
        type: String,
        required: true,
        minLength: 1,
        maxLength: 50
    },
    numero:{
        type: Number,
        required: true
    },
    correo: {
        type: String,
        required: true,
        unique: true,
        minLength: 1,
        maxLength: 50
    },
    contraseña:{
        type: String,
        required: true,
        minLength: 1,
        maxLength:100
    }
});

module.exports = mongoose.model('usuario', usuarioSchema);