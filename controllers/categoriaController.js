const categoria = require('../models/categoria')
const reservas = require('../models/reservas')
const createCategoria = (req, res) => {
    const {nombre} = req.body
    const {id} = req.params
    const newCategoria = new categoria({
        nombre
    })
    newCategoria.save((error, categoria) => {
        if(error){
            console.log('1',error)
            return res.status(400).send({message: "no se a podido crear la categoria"})
        }
        if(id == undefined || id == null || id == ''){
            return res.status(201).send(categoria)
        }
        reservas.updateOne({_id:id}, {$push:{categoria:categoria._id}}, (error, reservas) => {
            if(error){
                console.log('2',error)
                return res.status(400).send({message:"no se pudo actualizar la reserva"})
            }
            if(!reservas){
                return res.status(400).send({message:"no se encontro la reserva"})
            }
            return res.status(200).send({message: "servicio modificado"})

        })

    })
}

const getCategorias = (req, res)=>{
    categoria.find({}, (error, categoria) => {
        if(error){
            return res.status(400).send({message:"No se pudo realizar la busqueda"})
        }
        if(categoria.length == 0){
            return res.status(404).send({message:"No se encontraron categorias"})
        }
        return res.status(200).send(categoria)
    })
}

const updateCategoria = (req, res) =>{
    const {id} = req.params
    categoria.findByIdAndUpdate(id, req.body, (error, categoria) =>{
        if(error){
            return res.status(400).send({ message: "No se pudo actualizar la categoria"})
        }
        if(!categoria){
            return res.status(404).send({ message: "No se encontro la categoria"})
        }
        return res.status(200).send({ message: "categoria actualizada"})
    })
}

const deleteCategoria = (req, res) => {
    const {id} = req.params
    categoria.findByIdAndDelete(id, (error, categoria)=>{
        if(error){
            return res.status(400).send({message: "No se a podido eliminar la categoria"})
        }
        if(!categoria){
            return res.status(404).send({message:"No se a podido encontrar la categoria"})
        }
        return res.status(200).send({message: "Se a eliminado de forma correcta la categoria"})
    })

}
const getCategoria = (req, res) => {
    const {id} = req.params
    categoria.findById(id, (error, categoria)=>{
        if(error){
            return res.status(400).send({message: "No se a podido modificar la categoria"})
        }
        if(!categoria){
            return res.status(404).send({message:"No se a podido encontrar la categoria"})
        }
        return res.status(200).send(categoria)
    })
}

module.exports = {
    createCategoria,
    getCategorias,
    updateCategoria,
    deleteCategoria,
    getCategoria
}