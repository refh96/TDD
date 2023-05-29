const servicios = require('../models/servicios');
const createServicios = (req,res)=>{
    const {nombre,precio,descripcion} = req.body
    const newServicios = new servicios({
        nombre,
        precio,
        descripcion
    })
    newServicios.save((error, servicios)=>{
        if(error){
            return res.status(400).send({message:"no se a podido crear el servicio"})
        }
        return res.status(201).send(servicios)
    })
}

const getServicios = (req, res)=>{
    servicios.find({}, (error, servicios) => {
        if(error){
            return res.status(400).send({message:"No se pudo realizar la busqueda"})
        }
        if(servicios.length == 0){
            return res.status(404).send({message:"No se encontraron servicios"})
        }
        return res.status(200).send(servicios)
    })
}

const updateServicio = (req, res) =>{
    const {id} = req.params
    servicios.findByIdAndUpdate(id, req.body, (error, servicios) =>{
        if(error){
            return res.status(400).send({ message: "No se pudo actualizar el servicio"})
        }
        if(!servicios){
            return res.status(404).send({ message: "No se encontro el servicio"})
        }
        return res.status(200).send({ message: "servicio actualizado"})
    })
}

const deleteServicio = (req, res) => {
    const {id} = req.params
    servicios.findByIdAndDelete(id, (error, servicios)=>{
        if(error){
            return res.status(400).send({message: "No se a podido eliminar el servicio"})
        }
        if(!servicios){
            return res.status(404).send({message:"No se a podido encontrar el servicio"})
        }
        return res.status(200).send({message: "Se a eliminado de forma correcta el servicio"})
    })

}
const getServicio = (req, res) => {
    const {id} = req.params
    servicios.findById(id, (error, servicios)=>{
        if(error){
            return res.status(400).send({message: "No se a podido modificar el servicio"})
        }
        if(!servicios){
            return res.status(404).send({message:"No se a podido encontrar el servicio"})
        }
        return res.status(200).send(servicios)
    })
}
module.exports={
    createServicios,
    getServicios,
    updateServicio,
    deleteServicio,
    getServicio
}