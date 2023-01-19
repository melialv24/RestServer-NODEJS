const validarCampos =  require('./validar-campos')
const validarJWT =  require('./validar-jwt')
const validaRoles =  require('./validar-roles')
const existeCategoria =  require('./existeCategoria')


module.exports = {
    ...validarCampos,
    ...validarJWT,
    ...validaRoles,
    ...existeCategoria
}