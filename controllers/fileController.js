const fileModel = require("../models/file")

const uploadNewFile = (req,res)=>{
    const {files} = req
    let aux = files.map((file)=>{
        const newFile = new fileModel({
            url:file.path,
            name:file.originalname,
            mimeType:file.mimeType
        })
        newFile.save((err, fileSaved)=>{
            if(err){
                return res.status(400).send({message:"Error al guardar el archivo"})
            }
        })
        return newFile

    })
    return res.status(201).send(aux)
}

const getFiles = (req, res) => {
    fileModel.find({}, (err, files) => {
      if (err) {
        return res.status(400).send({ message: "Error al obtener los archivos" });
      }
      
      const folders = {};
      
      files.forEach((file) => {
        if (!folders[file.name]) {
          folders[file.name] = [];
        }
        
        folders[file.name].push({
          url: `http://localhost:80/${file.url}`,
          name: file.name,
          mimeType: file.mimeType,
        });
      });
      
      return res.status(200).send(folders);
    });
  };
  
const getSpecificFile = (req, res)=>{
    const {id} = req.params
    fileModel.findById(id,(err,file)=>{
        if(err){
            return res.status(400).send({message: "Error al obtener el archivo"})
        }
        if(!file){
            return res.status(404).send({message:"Archivo no existe"})
        }
        return res.download('./'+file.url)
    })
}

module.exports={
    uploadNewFile,
    getFiles,
    getSpecificFile
}