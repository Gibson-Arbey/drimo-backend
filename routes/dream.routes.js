const { Router } = require("express");
const { check } = require("express-validator");


const { dreamRegister, getDreams, getDreamById, deleteDream, updateDream } = require("../controllers/dream.controller");
const { validarCampos } = require("../middlewares/validar-campo");
const { validarJwt } = require("../middlewares/validar-jwt");

const router = Router();

router.post(
  "/",
  [
    validarJwt,
    check("userId", "El id del usuario no es valido").isMongoId(),
    check("title", "El titulo es obligatorio").not().isEmpty(),
    check("description", "La descripción es obligatoria").not().isEmpty(),
    check("labels", "Las etiquetas son obligatorias").isArray(),
    check("sleepFactors", "Los factores de sueño son obligatorios").isArray(),
    validarCampos
  ],
  dreamRegister
);

router.get("/", [validarJwt, validarCampos], getDreams);

router.get("/:dreamId", [
  validarJwt, 
  check("dreamId", "El id del sueño no es valido").isMongoId(),
  validarCampos
], getDreamById);

router.delete("/:dreamId", [
  validarJwt, 
  check("dreamId", "El id del sueño no es valido").isMongoId(),
  validarCampos
], deleteDream);

router.put(
  "/:dreamId",
  [
    validarJwt,
    check("dreamId", "El id del sueño no es valido").isMongoId(),
    check("title", "El titulo es obligatorio").not().isEmpty(),
    check("description", "La descripción es obligatoria").not().isEmpty(),
    check("labels", "Las etiquetas son obligatorias").isArray(),
    check("sleepFactors", "Los factores de sueño son obligatorios").isArray(),
    validarCampos
  ],
  updateDream
);

module.exports = router;
