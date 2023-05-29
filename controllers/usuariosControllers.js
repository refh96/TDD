const Usuarios = require('../models/usuarios');

const createUsuario = (req, res) => {
  const { nombre, correo, contraseña } = req.body;
  const newUsuario = new Usuarios({
    nombre,
    correo,
    contraseña
  });

  newUsuario.save((error, usuario) => {
    if (error) {
      return res.status(400).send({ message: "No se pudo crear el usuario" });
    }
    return res.status(201).send(usuario);
  });
};

const getUsuarios = (req, res) => {
  Usuarios.find({}, (error, usuarios) => {
    if (error) {
      return res.status(400).send({ message: "No se pudo realizar la búsqueda" });
    }
    if (usuarios.length === 0) {
      return res.status(404).send({ message: "No se encontraron usuarios" });
    }
    return res.status(200).send(usuarios);
  });
};

const updateUsuario = (req, res) => {
  const { id } = req.params;
  Usuarios.findByIdAndUpdate(id, req.body, (error, usuario) => {
    if (error) {
      return res.status(400).send({ message: "No se pudo actualizar el usuario" });
    }
    if (!usuario) {
      return res.status(404).send({ message: "No se encontró el usuario" });
    }
    return res.status(200).send({ message: "Usuario actualizado" });
  });
};

module.exports = {
  createUsuario,
  getUsuarios,
  updateUsuario
};
