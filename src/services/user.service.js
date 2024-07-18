const { models } = require("./../db/sequelize");
// handlers
const responseHandler = require("./../handlers/response.handler");

// Logica de negocio para la entidad User
class UserService {
  constructor() {}

  // Funcion para obtener todos los usuarios
  async findAll() {
    const users = await models.User.findAll({
      attributes: { exclude: ["password"] },
    });
    return users;
  }

  // Funcion para obtener un usuario por ID
  findOne(id) {
    return async (res) => {
      const user = await models.User.findOne({
        where: { id },
        attributes: { exclude: ["password"] },
      });
      if (!user) {
        return responseHandler.notfound(res, "Usuario no encontrado");
      }
      return user;
    };
  }

  // Funcion para obtener un usuario por email
  async findByEmail(email) {
    const user = await models.User.findOne({
      where: { email },
    });
    return user;
  }

  // Funcion para crear un usuario
  async create(payload) {
    const savedUser = await models.User.create(payload, { returning: true });
    return savedUser;
  }

  // Funcion para actualizar un usuario
  update(id, payload) {
    return async (res) => {
      const user = await this.findOne(id)(res);
      if (!user) {
        return responseHandler.notfound(res, "Usuario no encontrado");
      }
      const updatedUser = await user.update(payload, { returning: true });
      return updatedUser;
    };
  }

  // Funcion para eliminar un usuario
  delete(id) {
    return async (res) => {
      const user = await this.findOne(id)(res);
      if (!user) {
        return responseHandler.notfound(res, "Usuario no encontrado");
      }
      await user.destroy();
      return id;
    };
  }
}

module.exports = UserService;
