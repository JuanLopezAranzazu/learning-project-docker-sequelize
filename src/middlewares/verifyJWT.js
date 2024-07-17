const { config } = require("../config/config");
const jwt = require("jsonwebtoken");
// handlers
const responseHandler = require("./../handlers/response.handler");

// Middleware para verificar el token
function verifyToken(req, res, next) {
  try {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader?.startsWith("Bearer ")) {
      return responseHandler.unauthorize(res);
    }
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, config.secretKey);
    req.userId = decoded.userId;
    req.isAdmin = decoded.isAdmin;
    next();
  } catch (error) {
    return responseHandler.unauthorize(res);
  }
}

module.exports = verifyToken;
