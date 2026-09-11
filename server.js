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

// Función para registrar rutas de forma segura
const registerRoute = (path) => {
  try {
    const route = require(path);
    if (typeof route === "function") {
      route(app);
    } else {
      console.warn(`Aviso: La ruta ${path} exporta un router en lugar de una función.`);
    }
  } catch (err) {
    console.error(`Error cargando la ruta ${path}:`, err.message);
  }
};

// Carga de todas las rutas del sistema
registerRoute("./app/routes/client.routes.js");
registerRoute("./app/routes/employee.routes.js");
registerRoute("./app/routes/supplier.routes.js");
registerRoute("./app/routes/additionalService.routes.js");
registerRoute("./app/routes/booking.routes.js");
registerRoute("./app/routes/payment.routes.js");
registerRoute("./app/routes/invoice.routes.js");
registerRoute("./app/routes/report.routes.js");

// Sincronización de base de datos e inicio de servidor
const db = require("./app/models");
const PORT = process.env.PORT || 8080;

app.listen(PORT, async () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
  try {
    await db.sequelize.sync({ force: false });
    console.log("Base de datos sincronizada correctamente con Neon PostgreSQL.");
  } catch (err) {
    console.error("Error al sincronizar con PostgreSQL:", err.message);
  }
});