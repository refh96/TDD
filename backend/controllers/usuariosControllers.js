const usuarios = require('../models/usuarios');
const Regex = require('../utils/testRegex');
const bcrypt = require('bcrypt');

const createUsuario = async (req, res) => {
  const contraseña = await bcrypt.hash(req.body.contraseña, 10);
  const { nombre, apellido,  numero, correo, status, rol } = req.body;
  const newUsuario = new usuarios({
    nombre,
    apellido,
    numero,
    correo,
    contraseña,
    status,
    rol
  });
  if(!Regex.nombreRegex(nombre)){
    return res.status(400).send({ message: "Mal formato de nombre" })
  }
  else if(!Regex.nombreRegex(apellido)){
    return res.status(400).send({ message: "Mal formato de apellido" })
  }
  else if(!Regex.correoRegex(correo)){
    return res.status(400).send({ message: "Mal formato de correo" })
  }
  else if(!Regex.numeroRegex(numero)){
    return res.status(400).send({ message: "Mal formato de numero" })
  }
  else {
  newUsuario.save((error, usuario) => {
    if (error) {
      console.log('1',error)
      return res.status(400).send({ message: "No se pudo crear el usuario" })
    }
    return res.status(201).send(usuario)
  })
}}

const loginUsuario = async (req, res) =>{
  const {correo,contraseña} = req.body;
  usuarios.findOne({correo}, (error, usuario) =>{
    if(error){
      return res.status(400).send({message:"error al iniciar sesion"})
    }
    if(!usuario){
      return res.status(404).send({message:"no se encontro el usuario"})
    }
    bcrypt.compare(contraseña, usuario.contraseña, (error, resultado) =>{
      if(error){
        return res.status(400).send({message:"error al iniciar sesion"})
      }
      if(!resultado){
        return res.status(404).send({message:"contraseña incorrecta"})
      }
      return res.status(200).send({usuario:usuario, resultado:resultado})
    })
  })
}

const getUsuarios = (req, res) => {
  usuarios.find({}, (error, usuarios) => {
    if (error) {
      return res.status(400).send({ message: "No se pudo realizar la búsqueda" })
    }
    if (usuarios.length === 0) {
      return res.status(404).send({ message: "No se encontraron usuarios" })
    }
    return res.status(200).send(usuarios)
  })
}

const updateUsuario = (req, res) => {
  const { id } = req.params
  usuarios.findByIdAndUpdate(id, req.body, (error, usuario) => {
    if (error) {
      return res.status(400).send({ message: "No se pudo actualizar el usuario" })
    }
    if (!usuario) {
      return res.status(404).send({ message: "No se encontró el usuaraio" })
    }
    return res.status(200).send({ message: "usuario actualizado" })
  })
}

const deleteUsuario = (req, res) => {
  const {id} = req.params
  usuarios.findByIdAndDelete(id, (error, usuario)=>{
      if(error){
          return res.status(400).send({message: "No se a podido eliminar el usuario"})
      }
      if(!usuario){
          return res.status(404).send({message:"No se a podido encontrar el usuario"})
      }
      return res.status(200).send({message: "Se a eliminado de forma correcta el usuario"})
  })

}
const getUsuario = (req, res) => {
  const {id} = req.params
  usuarios.findById(id, (error, usuario)=>{
      if(error){
          return res.status(400).send({message: "No se a podido modificar el usuario"})
      }
      if(!usuario){
          return res.status(404).send({message:"No se a podido encontrar el usuario"})
      }
      return res.status(200).send(usuario)
  })
}
module.exports = {
  createUsuario,
  getUsuarios,
  updateUsuario,
  deleteUsuario,
  getUsuario,
  loginUsuario
}
