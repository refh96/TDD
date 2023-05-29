const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const servicioSchema = new Schema({
    nombre:{
        type: String,
        required: true,
        minLength: 1,
        maxLength:100
    },
    precio:{
        type: Number,
        required: true
    },
    descripcion:{
        type: String,
        required: true,
        minLength: 1,
        maxLength:100
    }
})

module.exports = mongoose.model('servicios', servicioSchema)