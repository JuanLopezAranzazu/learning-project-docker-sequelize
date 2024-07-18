const argon2 = require("argon2");
// handlers
const responseHandler = require("./../handlers/response.handler");
// utils
const generateToken = require("./../utils/generateToken");
// services
const UserService = require("../services/user.service");
const userService = new UserService();

// Controlador para registrar un usuario
const registerUser = async (req, res) => {
  try {
    const { body } = req;
    const { email, password, ...rest } = body;
    // validar que el email no exista
    const emailExists = await userService.findByEmail(email);
    if (emailExists) {
      return responseHandler.badrequest(res, `El correo ${email} ya existe`);
    }
    // encriptar la contraseña
    const hash = await argon2.hash(password);
    // guardar el usuario en la base de datos
    const savedUser = userService.create({
      email,
      password: hash,
      ...rest,
    });
    return responseHandler.created(res, savedUser);
  } catch (error) {
    return responseHandler.error(res);
  }
};

// Controlador para autenticar un usuario
const userLogin = async (req, res) => {
  try {
    const { body } = req;
    const { email, password } = body;
    // buscar el usuario en la base de datos y comparar contraseñas
    const foundUser = await userService.findByEmail(email);
    const passwordMatch =
      foundUser && (await argon2.verify(foundUser.password, password));

    if (!passwordMatch) {
      return responseHandler.badrequest(res, "Correo o contraseña incorrectos");
    }
    // payload del token
    const payload = { userId: foundUser.id, isAdmin: foundUser.isAdmin };
    // generar token
    const token = generateToken(payload);
    return responseHandler.ok(res, { token, user: foundUser });
  } catch (error) {
    return responseHandler.error(res);
  }
};

// Controlador para obtener la información del usuario autenticado
const whoAmI = async (req, res) => {
  try {
    const { userId } = req; // user authenticated
    const user = await userService.findOne(userId)(res);
    if (!user) {
      return responseHandler.notfound(res);
    }
    return responseHandler.ok(res, user);
  } catch (error) {
    return responseHandler.error(res);
  }
};

module.exports = { registerUser, userLogin, whoAmI };
