const jwt = require('jsonwebtoken')
const Usuario = require('../models/usuario')

const validarJWT = async( req, res = response, next) => {

    const token = req.header('x-token')

    if(!token){
        return res.status(401).json({
            msg: 'No hay token en la petición'
        })
    }


    try {

        const uid = jwt.verify(token, process.env.SECRETORPRIVATEKEY)

        const usuario = await Usuario.findById(uid)

        if(!usuario) return res.status(401).json({
            msg: 'Token no válido - usuario no existe en BD'
        })

        //Verificar si el usuario no ha sido eliminado
        if(!usuario.estado) return res.status(401).json({
            msg: 'Token no válido - usuario estado false'
        })

        if(usuario) {
            req.usuarioAutenticado = usuario
        } 
        

        next()
    } catch (error) {
        return res.status(401).json({
            msg: 'Token no valido'
        })
    }
}

module.exports = {
    validarJWT
}