const Clientes = require('../models/clientes');

const createCliente = (req, res) => {
  const { nombre, direccion, telefono } = req.body;
  const newCliente = new Clientes({
    nombre,
    direccion,
    telefono
  });

  newCliente.save((error, cliente) => {
    if (error) {
      return res.status(400).send({ message: "No se pudo crear el cliente" });
    }
    return res.status(201).send(cliente);
  });
};

const getClientes = (req, res) => {
  Clientes.find({}, (error, clientes) => {
    if (error) {
      return res.status(400).send({ message: "No se pudo realizar la búsqueda" });
    }
    if (clientes.length === 0) {
      return res.status(404).send({ message: "No se encontraron clientes" });
    }
    return res.status(200).send(clientes);
  });
};

const updateCliente = (req, res) => {
  const { id } = req.params;
  Clientes.findByIdAndUpdate(id, req.body, (error, cliente) => {
    if (error) {
      return res.status(400).send({ message: "No se pudo actualizar el cliente" });
    }
    if (!cliente) {
      return res.status(404).send({ message: "No se encontró el cliente" });
    }
    return res.status(200).send({ message: "Cliente actualizado" });
  });
};

module.exports = {
  createCliente,
  getClientes,
  updateCliente
};
