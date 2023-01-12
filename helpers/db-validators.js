const Role = require('../models/roles')
const Usuario = require('../models/usuario')

const isValidRole = async(rol = '') => {
    const existeRol = await Role.findOne({ rol });
    if(!existeRol) throw new Error(`El rol ${rol} no esta registrado en la base de datos. `)
}

const emailExist = async(correo = '') => {
    const exist = await Usuario.findOne({ correo });
    if(exist) throw new Error(`El correo ${correo} ya existe en la base de datos. `)
}

const existUserById = async(id) => {
    const exist = await Usuario.findById(id);
    if(!exist) throw new Error(`El id ${id} no se encuentra en BD. `)
}

module.exports = {isValidRole, emailExist, existUserById}