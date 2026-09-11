const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta principal para verificar que el servidor esté vivo
app.get("/", (req, res) => {
  res.json({ message: "API del Sistema de Hotel (UMG) lista." });
});

// Registrar Rutas
require("./app/routes/client.routes")(app);
require("./app/routes/employee.routes")(app);
require("./app/routes/supplier.routes")(app);
require("./app/routes/additionalService.routes")(app);
require("./app/routes/booking.routes")(app);
require("./app/routes/payment.routes")(app);
require("./app/routes/invoice.routes")(app);
require("./app/routes/report.routes")(app);

// Sincronización de Base de Datos e inicio de servidor
const db = require("./app/models");

const PORT = process.env.PORT || 8080;

// Levantar primero el puerto HTTP para que Render no aborte el servicio
app.listen(PORT, async () => {
  console.log(`Servidor iniciado y escuchando en el puerto ${PORT}`);
  
  try {
    await db.sequelize.sync({ force: false });
    console.log("Base de datos sincronizada correctamente con Neon PostgreSQL.");
  } catch (err) {
    console.error("Error de conexión/sincronización con la base de datos:", err.message);
  }
});