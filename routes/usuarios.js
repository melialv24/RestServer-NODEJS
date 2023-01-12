const {usuariosGet, usuariosPut, usuariosPost, usuariosDelete} = require('../controllers/usuarios')
const { Router } = require('express')
const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/validar-campos')
const { isValidRole, emailExist, existUserById } = require('../helpers/db-validators')


const router = Router()

router.get('/', usuariosGet )

router.put('/:id',[
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existUserById),
    check('rol').custom( isValidRole ),
    validarCampos
], usuariosPut)

router.post('/',[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('contrasena', 'La contrasena es obligatoria y m[as de 6 letras').isLength({ min: 6}),
    check('correo', 'El valor ingresado no tiene el aspecto de un correo ').isEmail(),
    check('correo').custom(emailExist),
    //check('rol', 'No es un rol valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('rol').custom( isValidRole ),
    validarCampos
], usuariosPost)

router.delete('/:id', [
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existUserById),
    validarCampos
],usuariosDelete)

module.exports = router;