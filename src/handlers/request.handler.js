const { validationResult } = require("express-validator");
// handlers
const responseHandler = require("./response.handler");

// Middleware para validar los errores de express-validator
const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return responseHandler.badrequest(res, errors.array()[0].msg);
  }

  next();
};

// Middleware para validar los id de los parametros
const validateId = (req, res, next) => {
  const { id } = req.params;

  if (!id || isNaN(id)) {
    return responseHandler.badrequest(res, "El ID debe ser un número");
  }

  next();
};

const requestHandler = {
  validate,
  validateId,
};

module.exports = requestHandler;
