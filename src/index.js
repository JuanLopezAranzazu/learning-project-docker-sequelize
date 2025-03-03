const express = require("express");
const cors = require("cors");
const { config } = require("./config/config");
const { logErrors, errorHandler } = require("./middlewares/errorHandler");
const sequelize = require("./db/sequelize");

const port = config.port;
const app = express();

// config express
const corsOptions = {
  origin: "*",
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
const routes = require("./routes/index");
routes(app);

// Verificar conexión a la base de datos
app.post("/db-check", async (req, res) => {
  try {
    await sequelize.authenticate();
    res.send(true);
  } catch (error) {
    res.send(false);
  }
});

// middlewares
app.use(logErrors);
app.use(errorHandler);

app.listen(port, () => console.log(`Servidor corriendo en el puerto ${port}`));
