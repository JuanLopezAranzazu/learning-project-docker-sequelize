const { models } = require("./../db/sequelize");
// handlers
const responseHandler = require("./../handlers/response.handler");

// Logica de negocio para la entidad User
class UserService {
  constructor() {}

  async findAll() {
    const users = await models.User.findAll({
      attributes: { exclude: ["password"] },
    });
    return users;
  }

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

  async findByEmail(email) {
    const user = await models.User.findOne({
      where: { email },
    });
    return user;
  }

  async create(payload) {
    const savedUser = await models.User.create(payload, { returning: true });
    return savedUser;
  }

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
