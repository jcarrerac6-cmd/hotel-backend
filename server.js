const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta principal
app.get("/", (req, res) => {
  res.json({ message: "API del Sistema de Hotel (UMG) lista y funcionando." });
});

// Rutas
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

const db = require("./app/models");
const PORT = process.env.PORT || 8080;

async function resetDatabase() {
  try {
    // 1. Borrar todas las tablas a la fuerza
    await db.sequelize.query('DROP SCHEMA public CASCADE;');
    await db.sequelize.query('CREATE SCHEMA public;');
    
    // 2. Recrear todo desde cero con las columnas mapeadas
    await db.sequelize.sync({ force: true });
    console.log("¡BASE DE DATOS ELIMINADA Y RECREADA CORRECTAMENTE!");

    app.listen(PORT, () => {
      console.log(`Servidor corriendo en el puerto ${PORT}`);
    });
  } catch (err) {
    console.error("Error al recrear base de datos:", err);
  }
}

resetDatabase();