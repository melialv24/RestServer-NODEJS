
const { Categoria } = require("../models")
const { response } = require("express")


const existeCategoria = async(id) => {

    const categoria = await Categoria.findById(id)

    if(!categoria) throw new Error(`El id ${id} no se encuentra en BD. `)


}

module.exports = {
    existeCategoria
}