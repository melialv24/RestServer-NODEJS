const { Router } = require('express')
const { check } = require('express-validator');
const { login, googleSignIn } = require('../controllers/auth');
const { crearCategoria, obtenerCategorias, obtenerCategoria, actualizarCategoria, borrarCategoria } = require('../controllers/categorias');
const { validarJWT, validarCampos, existeCategoria, esAdminRole } = require('../middlewares');

const router = Router()

//Obtener todas las categorías - publico
router.get('/', obtenerCategorias)

//Obtener una categoría por id - publico
router.get('/:id',[
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existeCategoria),
    validarCampos
],obtenerCategoria)

//Crear una nueva categoría  - privado - cualquier persona con un token valido
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], crearCategoria)

//Actualizar un registro  - privado - cualquier persona con un token valido
router.put('/:id',[
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existeCategoria),
    validarCampos
],actualizarCategoria)

//Delete - privado - Admin
router.delete('/:id',[
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existeCategoria),
    validarJWT,
    esAdminRole,
    validarCampos
], borrarCategoria)

module.exports = router;