const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const fileSchema = new Schema({
    url:{
        type: String,
        require:true
    },
    name:{
        type: String,
        require:true
    },
    mimeType: {
        type: String,
        require:true
    }
})

module.exports= mongoose.model('file', fileSchema);