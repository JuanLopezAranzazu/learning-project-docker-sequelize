const express = require("express");
// routes
const authRouter = require("./auth.router");

// Funcion para definir las rutas de la API
function routes(app) {
  const router = express.Router();
  app.use("/api/v1", router);
  router.use("/auth", authRouter);
}

module.exports = routes;
