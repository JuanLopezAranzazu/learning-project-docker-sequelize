// Funciones que se encarga de enviar la respuesta al cliente
// Funcion para enviar una respuesta con un status code y un mensaje
const responseWithData = (res, statusCode, data) =>
  res.status(statusCode).json(data);

// Funcion para enviar un error interno del servidor
const error = (res) =>
  responseWithData(res, 500, {
    status: 500,
    message: "Error interno del servidor",
  });

// Funcion para enviar un error de peticion incorrecta
const badrequest = (res, message) =>
  responseWithData(res, 400, {
    status: 400,
    message,
  });

// Funcion para enviar una respuesta exitosa
const ok = (res, data) => responseWithData(res, 200, data);

// Funcion para enviar una respuesta de recurso creado
const created = (res, data) => responseWithData(res, 201, data);

// Funcion para enviar una respuesta de acceso denegado
const unauthorize = (res) =>
  responseWithData(res, 401, {
    status: 401,
    message: "Acceso denegado",
  });

// Funcion para enviar una respuesta de recurso no encontrado
const notfound = (res, message) =>
  responseWithData(res, 404, {
    status: 404,
    message: message || "Recurso no encontrado",
  });

const responseHandler = {
  ok,
  created,
  error,
  badrequest,
  unauthorize,
  notfound,
};

module.exports = responseHandler;
