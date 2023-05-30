const usuario = require('../models/usuarios')

const checkRUT = (req, res, next) => {
    usuario.findOne({ _id: req.body.rut}, (err, usuario) => {
        if(err){
            return res.status(400).send({message:"El usuario no existe"})
        }
        if(!usuario){
            return res.status(404).send({message: "Usuario no existe"})
        }
        return res.status(200).send({message:"Usuario logeado correctamente"})
    })
}

module.exports = checkRUT;