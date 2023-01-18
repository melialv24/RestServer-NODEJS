const { Router } = require('express')
const { check } = require('express-validator');
const { login, googleSignIn } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router()

//Obtener todas las categorías - publico
router.get('/')

//Obtener una categoría por id - publico
router.get('/:id')

//Crear una nueva categoría  - privado - cualquier persona con un token valido
router.post('/')

//Actualizar un registro  - privado - cualquier persona con un token valido
router.put('/:id')

//Delete - privado - Admin
router.delete('/:id')

module.exports = router;