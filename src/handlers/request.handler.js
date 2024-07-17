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

const requestHandler = {
  validate,
};

module.exports = requestHandler;
