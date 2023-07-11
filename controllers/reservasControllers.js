const usuarios = require('../models/usuarios');
const reservas = require('../models/reservas');

const createReservas = (req,res) => {
    const {usuarioId, servicioId, fecha, categoria,status} = req.body
    const {id} = req.params
    const newReservas = new reservas({
    usuarioId,
    servicioId,
    fecha,
    categoria,
    status
    })
    const now = new Date
    const nextMonth = new Date
    nextMonth.setDate(nextMonth.getDate() + 30)
    const inicio = new Date(fecha)
    if(inicio < now){
        return res.status(400).send({ message: 'Error, fecha de reserva fuera de rango'})
    }
    else if(inicio > nextMonth){
        return res.status(400).send({ message: 'Error, fechas están fuera del periodo de un mes'})
    }
    newReservas.save((error, reservas)=>{
        if(error){
            return res.status(400).send({message:"no se a podido crear la reserva"})
        }
        if(id == undefined || id == null || id == ''){
            return res.status(201).send(reservas)
        }
        usuarios.updateOne({_id:id}, {$push:{reservas:reservas._id}}, (error, usuarios) => {
            if(error){
                console.log('2',error)
                return res.status(400).send({message:"no se pudo actualizar el usuario"})
            }
            if(!usuarios){
                return res.status(400).send({message:"no se encontro el usuario"})
            }
            return res.status(200).send({message: "reserva agregada"})

        })
    })
}

const getReservas = (req, res)=>{
    reservas.find().populate({path:'categoria'}).exec((error, reservas) => {
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