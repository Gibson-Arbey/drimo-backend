const { Usuario,} = require('../models/user.model');

const emailExiste = async( email = '' ) => {

    // Verificar si el email existe
    const existeEmail = await Usuario.findOne({ email });
    if ( existeEmail ) {
        throw new Error(`El email: ${ email }, ya está registrado`);
    }
}

const existeUsuarioPorId = async( id ) => {

    // Verificar si el usuario existe
    const existeUsuario = await Usuario.findById(id);
    if ( !existeUsuario ) {
        throw new Error(`El id no existe ${ id }`);
    }
}

module.exports = {
    emailExiste,
    existeUsuarioPorId,
}
