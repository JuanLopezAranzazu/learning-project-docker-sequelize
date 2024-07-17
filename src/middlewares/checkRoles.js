// handlers
const responseHandler = require("./../handlers/response.handler");

// Middleware para verificar si el usuario es administrador
const admin = (req, res, next) => {
  if (req.isAdmin) {
    next();
  } else {
    return responseHandler.unauthorize(res);
  }
};

module.exports = admin;
