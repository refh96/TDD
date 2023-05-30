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
    },
    status:{
        type: String,
        required: false,
        enum: [
            'Permitido',
            'Bloqueado'
        ]
    },
    rol: {
        type: String,
        enum: [
        'admin',
        'cliente'
    ]
    }
});

module.exports = mongoose.model('usuario', usuarioSchema);