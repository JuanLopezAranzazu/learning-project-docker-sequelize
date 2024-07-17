const { models } = require("./../db/sequelize");

// Logica de negocio para la entidad User
class UserService {
  constructor() {}

  async findAll() {
    const users = await models.User.findAll({
      attributes: { exclude: ["password"] },
    });
    return users;
  }

  async findOne(id) {
    const user = await models.User.findOne({
      where: { id },
      attributes: { exclude: ["password"] },
    });
    if (!user) throw Error("Usuario no encontrado");
    return user;
  }

  async findByEmail(email) {
    const user = await models.User.findOne({
      where: { email },
    });
    return user;
  }

  async create(payload) {
    const savedUser = await models.User.create(payload);
    return savedUser;
  }

  async update(id, payload) {
    const user = await this.findOne(id);
    if (!user) throw Error("Usuario no encontrado");
    const updatedUser = await user.update(payload);
    return updatedUser;
  }

  async delete(id) {
    const user = await this.findOne(id);
    if (!user) throw Error("Usuario no encontrado");
    await user.destroy();
    return id;
  }
}

module.exports = UserService;
