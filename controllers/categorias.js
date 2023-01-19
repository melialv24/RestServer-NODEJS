const { response } = require("express")
const {Categoria, Usuario} = require('../models')

const obtenerCategorias = async(req, res = response) => {

    const query = {estado: true}

    const { limit = 5, from = 0 } = req.query

    const [total, categorias ] = await Promise.all([
        Categoria.countDocuments(query),
        Categoria.find(query)
            .limit(Number(limit))
            .skip(Number(from))

    ])

    res.json({
        msg: 'consulta exitosa.',
        total, 
        categorias
    })

}

//Obtener categoria 
const obtenerCategoria = async(req, res = response) => {

    const {id} = req.params

    const categoria = await Categoria.findById(id)

    if(!categoria) return res.status(400).json({
        msg: 'No se ha encontrado la categoria con ese ID.'
    })

    return res.status(201).json({
        msg: 'Consulta exitosa',
        categoria
    })

}

//Actualizar categoria - nombre
const actualizarCategoria = async(req, res = response) => {

    const {id} = req.params
    const { _id, ...resto } = req.body

    const categoria = await Categoria.findByIdAndUpdate(id, resto );


    res.json({
        categoria
    });

}

//borrar categoria - cambiando estado a false
const borrarCategoria = async(req, res = response) => {

    const {id} = req.params

    const usuarioAutenticado = req.usuarioAutenticado

    // Físicamente lo borramos
    const categoriaEliminada = await Categoria.findByIdAndUpdate(id, {estado: false})
    
    res.json({categoriaEliminada, usuarioAutenticado});

}

const crearCategoria = async(req, res = response) => {

    try {
        
        const nombre = req.body.nombre.toUpperCase()

        const categoriaDB = await Categoria.findOne({nombre})

        if(categoriaDB) {
            return res.status(400).json({
                msg: `La categoría ${categoriaDB} ya existía previamente.`
            })
        }

        console.log( req.usuarioAutenticado)

        //Generar la data a grabar
        const data = {
            nombre,
            usuario: req.usuarioAutenticado._id
        }

        const categoria = new Categoria(data)
        await categoria.save()

        return res.status(201).json({
            msg: 'Guardado de manera exitosa.',
            categoria
        })

    } catch (error) {
        console.log(error)
    }

}

module.exports = {
    crearCategoria,
    obtenerCategoria,
    obtenerCategorias,
    actualizarCategoria,
    borrarCategoria
}