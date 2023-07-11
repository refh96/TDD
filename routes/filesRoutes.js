const express= require('express')
const fileController = require('../controllers/fileController')
const upload = require('../middlewares/handleMulter.js')
const fileSize = require('../middlewares/fileSize.js')

const api= express.Router()

api.post("/file/:archivo", upload.array('archivos'),fileSize,fileController.uploadNewFile)
api.get('/files', fileController.getFiles)
api.get('/file/download/:id', fileController.getSpecificFile)

module.exports=api