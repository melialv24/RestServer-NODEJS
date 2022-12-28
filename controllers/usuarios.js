const {request, response} = require('express')
const Usuario = require('../models/usuario')
const bcryptjs = require('bcryptjs');

const usuariosGet = (req = request, res = response) => {

    const {name, apiKey, limit = 1} = req.query;
    res.json({
        msg: 'get API - CONTROLLER',
        name,
        apiKey,
        limit
    });
}

const usuariosPost = async(req, res = response) => {

    const {nombre, correo, contrasena, rol} = req.body;
    const usuario = new Usuario( {nombre, correo, contrasena, rol} );
    // Verificar si el correo existe 
    const existeEmail = await Usuario.findOne({ correo })

    if(existeEmail) return res.status(400).json({
        msg: 'Ese correro ya está registrado'
    })
    //Encriptar la contraseña
    // el salt es el numero de vueltas que queremos hacer complicada nuestra encriptcion por defecto es 10 
    // podemos poner 100 y es mas difícil de desencriptar pero demora mas
    const salt = bcryptjs.genSaltSync()
    //este es para encriptar en una sola vía
    usuario.contrasena = bcryptjs.hashSync(contrasena, salt)

    // Guardar en DB
    await usuario.save();

    res.json({
        msg: 'get POST - CONTROLLER',
        usuario
    });
}

const usuariosPut = async(req, res = response) => {

    const {id} = req.params
    const {password, google, correo, ...resto } = req.body

    // TODO Validar contra base de datos

    if(password){
        //Encriptar la contraseña
        // el salt es el numero de vueltas que queremos hacer complicada nuestra encriptcion por defecto es 10 
        // podemos poner 100 y es mas difícil de desencriptar pero demora mas
        const salt = bcryptjs.genSaltSync()
        //este es para encriptar en una sola vía
        resto.contrasena = bcryptjs.hashSync(contrasena, salt)


    }

    
    const usuario = await Usuario.findByIdAndUpdate(id, resto );


    res.json({
        msg: 'get PUT - CONTROLLER',
        id
    });
}

const usuariosDelete = (req, res = response) => {
    res.json({
        msg: 'get DELETE - CONTROLLER'
    });
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete,
}