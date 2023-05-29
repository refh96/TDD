const reservas = require('../models/reservas');
const createReservas = (req,res)=>{
    const {clienteId, servicioId, fecha, categoria} = req.body
    const newReservas = new reservas({
    clienteId,
    servicioId,
    fecha,
    categoria
    })
    newReservas.save((error, reservas)=>{
        if(error){
            return res.status(400).send({message:"no se a podido crear la reserva"})
        }
        return res.status(201).send(reservas)
    })
}

const getReservas = (req, res)=>{
    reservas.find().populate({path:'[categoria]'}).exec((error, reservas) => {
        if(error){
            return res.status(400).send({message:"No se pudo realizar la busqueda"})
        }
        if(reservas.length == 0){
            return res.status(404).send({message:"No se encontraron reservas"})
        }
        return res.status(200).send(reservas)
    })
}

const updateReserva = (req, res) =>{
    const {id} = req.params
    reservas.findByIdAndUpdate(id, req.body, (error, reservas) =>{
        if(error){
            return res.status(400).send({ message: "No se pudo actualizar la reserva"})
        }
        if(!reservas){
            return res.status(404).send({ message: "No se encontro la reserva"})
        }
        return res.status(200).send({ message: "reserva actualizada"})
    })
}

const deleteReserva = (req, res) => {
    const {id} = req.params
    reservas.findByIdAndDelete(id, (error, reservas)=>{
        if(error){
            return res.status(400).send({message: "No se a podido eliminar la reserva"})
        }
        if(!reservas){
            return res.status(404).send({message:"No se a podido encontrar la reserva"})
        }
        return res.status(200).send({message: "Se a eliminado de forma correcta la reserva"})
    })

}
const getReserva = (req, res) => {
    const {id} = req.params
    reservas.findById(id, (error, reservas)=>{
        if(error){
            return res.status(400).send({message: "No se a podido modificar la reserva"})
        }
        if(!reservas){
            return res.status(404).send({message:"No se a podido encontrar la reserva"})
        }
        return res.status(200).send(reservas)
    })
}
module.exports={
    createReservas,
    getReservas,
    updateReserva,
    deleteReserva,
    getReserva
}