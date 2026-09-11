const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta principal para comprobar estado del servidor
app.get("/", (req, res) => {
  res.json({ message: "API del Sistema de Hotel (UMG) lista y funcionando." });
});

// Carga directa de todas las rutas
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

// Sincronización de base de datos e inicio de servidor
const db = require("./app/models");
const PORT = process.env.PORT || 8080;

app.listen(PORT, async () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
  try {
    // alter: true sincroniza la estructura y agrega las columnas/foreign keys faltantes en Neon PostgreSQL
   // await db.sequelize.sync({ alter: true });
    await db.sequelize.sync({ force: true });
    console.log("Base de datos sincronizada correctamente con Neon PostgreSQL.");
  } catch (err) {
    console.error("Error al sincronizar con PostgreSQL:", err.message);
  }
});
