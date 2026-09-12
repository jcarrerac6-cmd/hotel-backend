const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");

// RUTA PARA DESTRUIR Y VOLVER A CREAR LA BASE DE DATOS
app.get("/api/reset-db", async (req, res) => {
  try {
    await db.sequelize.query('DROP SCHEMA public CASCADE;');
    await db.sequelize.query('CREATE SCHEMA public;');
    await db.sequelize.sync({ force: true });
    res.json({ message: "¡BASE DE DATOS BORRADA Y DESTRUIDA CON ÉXITO!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Ruta principal
app.get("/", (req, res) => {
  res.json({ message: "API funcionando." });
});

// Cargar rutas
require("./app/routes/client.routes.js")(app);
require("./app/routes/employee.routes.js")(app);
require("./app/routes/supplier.routes.js")(app);
require("./app/routes/room.routes.js")(app);
require("./app/routes/additionalService.routes.js")(app);
require("./app/routes/booking.routes.js")(app);
require("./app/routes/payment.routes.js")(app);
require("./app/routes/invoice.routes.js")(app);
require("./app/routes/report.routes.js")(app);
require("./app/routes/auth.routes.js")(app);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});