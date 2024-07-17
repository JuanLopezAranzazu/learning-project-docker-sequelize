const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

//controllers
const {
  registerUser,
  userLogin,
  whoAmI,
} = require("../controllers/auth.controller");
//middlewares
const verifyJWT = require("./../middlewares/verifyJWT");
// handlers
const requestHandler = require("./../handlers/request.handler");

// routes
// api para registrar un usuario
router.post(
  "/register",
  body("name")
    .exists()
    .withMessage("El nombre es requerido")
    .isLength({ min: 3, max: 128 })
    .withMessage("El nombre debe tener entre 3 y 128 caracteres"),
  body("email")
    .exists()
    .withMessage("El correo es requerido")
    .isEmail()
    .withMessage("El correo no es válido"),
  body("password")
    .exists()
    .withMessage("La contraseña es requerida")
    .isLength({ min: 6, max: 128 })
    .withMessage("La contraseña debe tener entre 6 y 128 caracteres"),
  requestHandler.validate,
  registerUser
);
// api para iniciar sesión
router.post(
  "/login",
  body("email").exists().withMessage("El correo es requerido"),
  body("password").exists().withMessage("La contraseña es requerida"),
  requestHandler.validate,
  userLogin
);
// api para obtener la información del usuario autenticado
router.get("/whoami", verifyJWT, whoAmI);

module.exports = router;
