// handlers
const responseHandler = require("../handlers/response.handler");
// services
const UserService = require("../services/user.service");
const userService = new UserService();

// Controlador para obteneros todos los usuarios
const findAllUsers = async (req, res) => {
  try {
    const users = await userService.findAll();
    return responseHandler.ok(res, users);
  } catch (error) {
    return responseHandler.error(res);
  }
};

// Controlador para obtener un usuario por ID
const findOneUser = async (req, res) => {
  try {
    const { params } = req;
    const { id } = params;
    const foundUser = await userService.findOne(id)(res);
    return responseHandler.ok(res, foundUser);
  } catch (error) {
    return responseHandler.error(res);
  }
};

// Controlador para crear un usuario
const createUser = async (req, res) => {
  try {
    const { body } = req;
    const savedUser = await userService.create({
      ...body,
      image: req.file ? `/uploads/${req.file.filename}` : null,
    });
    return responseHandler.created(res, savedUser);
  } catch (error) {
    return responseHandler.error(res);
  }
};

// Controlador para actualizar un usuario por ID
const updateUser = async (req, res) => {
  try {
    const { params, body } = req;
    const { id } = params;
    const updatedUser = await userService.update(id, {
      ...body,
      image: req.file ? `/uploads/${req.file.filename}` : null,
    })(res);
    return responseHandler.ok(res, updatedUser);
  } catch (error) {
    return responseHandler.error(res);
  }
};

// Controlador para eliminar un usuario por ID
const deleteUser = async (req, res) => {
  try {
    const { params } = req;
    const { id } = params;
    const userId = await userService.delete(id)(res);
    return responseHandler.ok(res, {
      message: `El usuario con el ID ${userId} fue eliminado`,
    });
  } catch (error) {
    return responseHandler.error(res);
  }
};

module.exports = {
  findAllUsers,
  findOneUser,
  createUser,
  updateUser,
  deleteUser,
};
