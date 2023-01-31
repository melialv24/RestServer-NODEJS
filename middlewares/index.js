const validarCampos =  require('./validar-campos')
const validarJWT =  require('./validar-jwt')
const validaRoles =  require('./validar-roles')
const existeCategoria =  require('./existeCategoria')
const existeProducto =  require('./existeProducto')
const validarArchivos = require('./validar-archivo')


module.exports = {
    ...validarCampos,
    ...validarJWT,
    ...validaRoles,
    ...existeCategoria,
    ...existeProducto,
    ...validarArchivos
}