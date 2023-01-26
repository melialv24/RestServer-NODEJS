const { response } = require("express");
const { subirArchivo } = require("../helpers");


const cargarArchivo = async(req, res=response) => {

    try {
        if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
            return res.status(400).send('No hay archivos por subir.');
        }

        const nombre = await subirArchivo(req.files, ['txt','md'], 'textos')

        res.json({
            msg: nombre
        })
    
    } catch (msg) {
        res.status(400).json({
            msg
        })
    }

    

}

const actualizarImagen = async(req, res=response) => {

    const { coleccion, id} = req.params

    res.json({ coleccion, id})

}

module.exports = {
    cargarArchivo,
    actualizarImagen
}