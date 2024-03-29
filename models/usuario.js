const { Schema, model } = require('mongoose')

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    correo: {
        type: String,
        unique: true,
        required: [true, 'El correo es obligatorio']
    },
    contrasena: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    img: {
        type: String
    },
    rol: {
        type: String,
        required: true,
        emun: ['ADMIN_ROLE', 'USER_ROLE']
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    },
})


UsuarioSchema.methods.toJSON = function()  {
    const { __v, _id,  ...usuario} = this.toObject();

    usuario.uid = _id

    return usuario
}

module.exports = model('Usuario', UsuarioSchema)