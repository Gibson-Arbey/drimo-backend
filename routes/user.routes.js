const { Router } = require("express");
const { check } = require("express-validator");


const { userLogin, userRegister } = require("../controllers/user.controller");
const { emailExiste } = require('../helpers/db-validator');
const { validarCampos } = require("../middlewares/validar-campo");

const router = Router();

router.post(
  "/login",
  [
    check("email", "El correo no es valido").isEmail(),
    check("password", "La contrase es obligatoria").not().isEmpty(),
    validarCampos,
  ],
  userLogin
);

router.post(
  "/register",
  [
    check("password", "El password debe de ser más de 6 letras").isLength({
      min: 6,
    }),
    check("email", "El correo no es válido").isEmail(),
    check("email").custom(emailExiste),
    validarCampos,
  ],
  userRegister
);

module.exports = router;
