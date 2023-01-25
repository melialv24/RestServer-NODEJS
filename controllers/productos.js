const { response } = require("express")
const {Producto, Usuario, Categoria} = require('../models')

const obtenerProductos = async(req, res = response) => {

    const query = {estado: true}

    const { limit = 5, from = 0 } = req.query

    const [total, productos ] = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query)
        .populate('usuario', 'nombre')
        .populate('categoria', 'nombre')
            .limit(Number(limit))
            .skip(Number(from))

    ])

    res.json({
        msg: 'consulta exitosa.',
        total, 
        productos
    })

}

//Obtener producto 
const obtenerProducto = async(req, res = response) => {

    const {id} = req.params

    const producto = await Producto.findById(id)
    .populate('usuario', 'nombre')
    .populate('categoria', 'nombre')

    if(!producto) return res.status(400).json({
        msg: 'No se ha encontrado el producto con ese ID.'
    })

    return res.status(201).json({
        msg: 'Consulta exitosa',
        producto
    })

}

//Actualizar producto - nombre
const actualizarProducto = async(req, res = response) => {

    const {id} = req.params
    const { _id, estado, usario, ...data } = req.body

    if(data.nombre) {
        data.nombre = data.nombre.toUpperCase()
    }

    data.usuario = req.usuarioAutenticado._id

    const producto = await Producto.findByIdAndUpdate(id, data, { new: true} );


    res.json({
        producto
    });

}

//borrar producto - cambiando estado a false
const borrarProducto = async(req, res = response) => {

    const {id} = req.params

    const usuarioAutenticado = req.usuarioAutenticado

    // Físicamente lo borramos
    const productoEliminado = await Producto.findByIdAndUpdate(id, {estado: false})
    
    res.json({productoEliminado, usuarioAutenticado});

}

const crearProducto = async(req, res = response) => {

    try {
        
        const {
            estado, usuario, ...body
        } = req.body

        const productoDB = await Producto.findOne({nombre: body.nombre})

        if(productoDB) {
            return res.status(400).json({
                msg: `El producto ${productoDB} ya existía previamente.`
            })
        }

        //Generar la data a grabar
        const data = {
            ...body,
            nombre: body.nombre.toUpperCase(),
            usuario: req.usuarioAutenticado._id,
        }

        const producto = new Producto(data)
        await producto.save()

        return res.status(201).json({
            msg: 'Guardado de manera exitosa.',
            producto
        })

    } catch (error) {
        console.log(error)
    }

}

module.exports = {
    crearProducto,
    obtenerProducto,
    obtenerProductos,
    actualizarProducto,
    borrarProducto
}