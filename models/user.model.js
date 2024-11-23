
const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
    email: {
        type: String,
        required: [true, 'El email es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria'],
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    },
});



UsuarioSchema.methods.toJSON = function() {
    const { __v, _id, password, ...usuario  } = this.toObject();
    usuario.uid = _id;
    return usuario;
}

module.exports = model( 'User', UsuarioSchema );