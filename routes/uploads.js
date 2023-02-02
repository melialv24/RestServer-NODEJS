const { Router } = require('express')
const { check } = require('express-validator');
const { cargarArchivo, mostrarImagen, actualizarImagenCloudinary } = require('../controllers/uploads');
const {coleccionesPermitidas} = require('../helpers');
const { validarArchivos, validarCampos } = require('../middlewares');

const router = Router()

router.post('/', [validarArchivos, validarCampos],cargarArchivo)

router.get('/:coleccion/:id', [
    check('id', 'El id debe ser de mongo').isMongoId(),
    check('coleccion').custom( c => coleccionesPermitidas(c, ['usuarios', 'productos'])),
    validarCampos
],mostrarImagen)

router.put('/:coleccion/:id', [
    validarArchivos,
    check('id', 'El id debe ser de mongo').isMongoId(),
    check('coleccion').custom( c => coleccionesPermitidas(c, ['usuarios', 'productos'])),
    validarCampos
], actualizarImagenCloudinary)

module.exports = router;