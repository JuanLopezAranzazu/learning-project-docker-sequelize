const { config } = require("../config/config");

// Funcion para logear los errores
function logErrors(err, req, res, next) {
  console.log("logErrors");
  console.error(err);
  next(err);
}

// Funcion para manejar los errores
function errorHandler(err, req, res, next) {
  console.log("errorHandler");
  res.status(500).json({
    message: err.message,
    stack: config.env === "test" ? err.stack : {},
  });
}

module.exports = { logErrors, errorHandler };
