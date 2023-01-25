const { response } = require("express");
const { ObjectId } = require('mongoose').Types

const { Usuario, Categoria, Producto } = require('../models')

const coleccionesPermitidas = [
    'categorias',
    'productos',
    'roles',
    'usuarios',
]

const buscarUsuarios = async( termino= '', res=response) => {
    const esMongoId = ObjectId.isValid( termino )

    if(esMongoId){
        const usuario = await Usuario.findById(termino)
        res.json({
            results: usuario ?  [ usuario ] : []
        })
    }else{
        const regex = new RegExp(termino, 'i')
        const usuarios = await Usuario.find({ 
            $or: [{ nombre: regex }, {correo: regex}],
            $and: [{ estado: true }]
         })
        res.json({
            results: usuarios ?  [ usuarios ] : []
        })
    }
}

const buscarCategorias = async( termino= '', res=response) => {
    const esMongoId = ObjectId.isValid( termino )

    if(esMongoId){
        const categoria = await Categoria.findById(termino)
        res.json({
            results: categoria ?  [ categoria ] : []
        })
    }else{
        const regex = new RegExp(termino, 'i')
        const categorias = await Categoria.find({ nombre: regex, estado: true })
        res.json({
            results: categorias ?  [ categorias ] : []
        })
    }
}

const buscarProductos = async( termino= '', res=response) => {
    const esMongoId = ObjectId.isValid( termino )

    if(esMongoId){
        const producto = await Producto.findById(termino)
        .populate('categoria', 'nombre')
        res.json({
            results: producto ?  [ producto ] : []
        })
    }else{
        const regex = new RegExp(termino, 'i')
        const productos = await Producto.find({ nombre: regex, estado: true })
        .populate('categoria', 'nombre')
        res.json({
            results: productos ?  [ productos ] : []
        })
    }
}

const buscar = ( req, res = response) => {

    const { coleccion, termino} = req.params

    if( !coleccionesPermitidas.includes( coleccion )){
        return res.status(400).json({
            msg: 'La colección no existe'
        })
    }

    switch (coleccion) {
        case 'categorias': 
            buscarCategorias(termino, res)
        break;
        case 'productos': 
            buscarProductos(termino, res)
        break;
        case 'usuarios': 
            buscarUsuarios(termino, res)
        break;

        default:
            res.status(500).json({
                msg: 'Se me olvido hacer esta búsqueda'
            })
    }

}

module.exports = {
    buscar
}