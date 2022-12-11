const {request, response} = require('express')

const usuariosGet = (req = request, res = response) => {

    const {name, apiKey, limit = 1} = req.query;
    res.json({
        msg: 'get API - CONTROLLER',
        name,
        apiKey,
        limit
    });
}

const usuariosPost = (req, res = response) => {
    const {name, age} = req.body;
    res.json({
        msg: 'get POST - CONTROLLER',
        name,
        age
    });
}

const usuariosPut = (req, res = response) => {

    const id = req.params.id

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