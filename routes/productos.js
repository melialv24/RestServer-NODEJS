const { Router } = require('express')
const { check } = require('express-validator');
const { login, googleSignIn } = require('../controllers/auth');
const { crearProducto, obtenerProductos, obtenerProducto, actualizarProducto, borrarProducto } = require('../controllers/productos');
const { validarJWT, validarCampos, existeProducto, esAdminRole, existeCategoria } = require('../middlewares');

const router = Router()

//Obtener todas las categorías - publico
router.get('/', obtenerProductos)

//Obtener una categoría por id - publico
router.get('/:id',[
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existeProducto),
    validarCampos
],obtenerProducto)

//Crear una nueva categoría  - privado - cualquier persona con un token valido
router.post('/', [
    validarJWT,
    check('categoria', 'No es un ID de mongo').isMongoId(),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('categoria').custom(existeCategoria),
    validarCampos
], crearProducto)

//Actualizar un registro  - privado - cualquier persona con un token valido
router.put('/:id',[
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existeProducto),
    validarCampos
],actualizarProducto)

//Delete - privado - Admin
router.delete('/:id',[
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existeProducto),
    validarJWT,
    esAdminRole,
    validarCampos
], borrarProducto)

module.exports = router;