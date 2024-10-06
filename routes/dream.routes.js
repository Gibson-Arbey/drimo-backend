const { Router } = require("express");
const { check } = require("express-validator");


const { dreamRegister } = require("../controllers/dream.controller");
const { validarCampos } = require("../middlewares/validar-campo");

const router = Router();

router.post(
  "/",
  [

  ],
  dreamRegister
);


module.exports = router;
