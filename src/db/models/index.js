const { User, UserSchema } = require("./user.model");

// Función para definir los modelos de la base de datos
function models(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  User.associate(sequelize.models);
}

module.exports = models;
