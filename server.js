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

// Carga directa de rutas
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

// FORZAR SINCRO ANTES DE LEVANTAR EL PUERTO
db.sequelize.sync({ force: true }).then(() => {
  console.log("Tablas recreadas correctamente con FKs en Neon DB.");
  app.listen(PORT, () => {
    console.log(`Servidor listo en el puerto ${PORT}`);
  });
}).catch((err) => {
  console.error("Error al sincronizar con PostgreSQL:", err.message);
});