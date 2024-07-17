const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

//controllers
const {
  findAllUsers,
  findOneUser,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/user.controller");
//middlewares
const verifyJWT = require("../middlewares/verifyJWT");
const upload = require("../middlewares/uploadConfig");
const admin = require("../middlewares/checkRoles");
// handlers
const requestHandler = require("../handlers/request.handler");

// routes
// api para obtener todos los articulos del usuario
router.get("/all", verifyJWT, admin, findAllUsers);
// api para obtener un articulo por id
router.get("/:id", verifyJWT, admin, requestHandler.validateId, findOneUser);
// api para crear un articulo
router.post(
  "/",
  verifyJWT,
  admin,
  upload.single("image"), // middleware para subir la imagen
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
  createUser
);
// api para actualizar un articulo
router.put(
  "/:id",
  verifyJWT,
  admin,
  requestHandler.validateId,
  upload.single("image"), // middleware para subir la imagen
  body("name")
    .optional()
    .isLength({ min: 3, max: 128 })
    .withMessage("El nombre debe tener entre 3 y 128 caracteres"),
  body("email").optional().isEmail().withMessage("El correo no es válido"),
  body("password")
    .optional()
    .isLength({ min: 6, max: 128 })
    .withMessage("La contraseña debe tener entre 6 y 128 caracteres"),
  requestHandler.validate,
  updateUser
);
// api para eliminar un articulo
router.delete("/:id", verifyJWT, admin, requestHandler.validateId, deleteUser);

module.exports = router;
