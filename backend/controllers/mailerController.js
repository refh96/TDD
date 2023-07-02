const nodemailer = require('nodemailer')
const dotenv = require('dotenv')
const mail = 'r.e.f.h9696@gmail.com'
dotenv.config()

const sendmail = (req, res) =>{
    const { message } =req.body
    const token = process.env.PW
    if(!token){
        return res.status(400).send({message:"No se a entregado la contraseña de aplicacion para el correo en el archivo .env"})
    }
    const transporter = nodemailer.createTransport({
        host:"smtp.gmail.com",
        port: 465,
        secure: true,
        auth:{
            user:"r.e.f.h9696@gmail.com",
            pass:token
        }
    })
    let directory = [
        "rodrigoflores9696@gmail.com"
    ]
    const mailOptions = {
        from:`Administrador <${mail}>`,
        to: directory,
        subject: 'Envio de correo',
        text:`Hola, se a realizado de forma correcta el envio de correos, el mensaje era ${message}`,
        html:`
            <h1>felicitaciones, haz enviado un correo</h1>
            <p>${message}</p>
        `
    }
    transporter.sendMail(mailOptions, (error, info) =>{
        if(error){
            return res.status(400).send({message: 'error al enviar el correo'})
        }
        return res.status(200).send({message: 'Mensaje enviado'})
    })
    transporter.verify().then(() =>{
        console.log('Servidor de correos habilitado')
    }).catch(error =>{
        console.log('Error al utilizar servidor de correos')
    })
}

module.exports= sendmail
