const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const categoriaSchema = new Schema({
    nombre:{
        type: String,
        required: true,
        minLength: 1,
        maxLength:20
    },
    descripcion:{
        type: String,
        required: true,
        minLength: 1,
        maxLength:100
    }
})

module.exports = mongoose.model('categoria', categoriaSchema)