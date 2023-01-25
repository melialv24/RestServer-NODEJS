
const { Producto } = require("../models")


const existeProducto = async(id) => {

    const producto = await Producto.findById(id)

    if(!producto) throw new Error(`El id ${id} no se encuentra en BD. `)


}

module.exports = {
    existeProducto
}