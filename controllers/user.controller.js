const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const { generarJwt } = require("../helpers/generar-jwt");
const Usuario = require('../models/user.model');

const userLogin = async (req = request, res = response) => {
  const { email, password } = req.body;

  try {
    const usuario = await Usuario.findOne({ email });

    // Validar email
    if (!usuario) {
      return res.status(400).json({ msg: "Usuario o contraseña incorrectos" });
    }

    // Validar contraseña
    const validPassword = bcryptjs.compareSync(password, usuario.password);
    if (!validPassword) {
      return res.status(400).json({ msg: "Usuario o contraseña incorrectos" });
    }

    //   Generar Jwt
    const token = await generarJwt(usuario.id);
    return res.json({
      msg: {
        usuario,
        token,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error en el login" });
  }
};

const userRegister = async(req, res = response) => {
    
    try {
        const { email, password } = req.body;
        const usuario = new Usuario({ email, password });

        // Encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        usuario.password = bcryptjs.hashSync( password, salt );

        // Guardar en BD
        await usuario.save();

        return res.json({
            usuario
        });
    } catch (error) {
        return res.status(500).json({msg: error.message})
    }
}

module.exports = {
    userLogin,
    userRegister,
}