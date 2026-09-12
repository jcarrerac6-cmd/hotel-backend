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

// ELIMINAR TABLAS CONFLICTIVAS VÍA SQL DIRECTO Y RECREAR
async function startServer() {
  try {
    // Destruye completamente las tablas que causan conflicto
    await db.sequelize.query('DROP TABLE IF EXISTS "payments" CASCADE;');
    await db.sequelize.query('DROP TABLE IF EXISTS "invoice_details" CASCADE;');
    await db.sequelize.query('DROP TABLE IF EXISTS "invoiceDetails" CASCADE;');
    await db.sequelize.query('DROP TABLE IF EXISTS "invoices" CASCADE;');
    await db.sequelize.query('DROP TABLE IF EXISTS "bookings" CASCADE;');
    
    // Sincroniza y crea el esquema limpio coincidente con los modelos actuales
    await db.sequelize.sync({ force: true });
    
    console.log("¡TABLAS DESTRUIDAS Y RECREADAS CON ÉXITO!");
    
    app.listen(PORT, () => {
      console.log(`Servidor listo en el puerto ${PORT}`);
    });
  } catch (err) {
    console.error("Error al recrear la base de datos:", err);
  }
}

startServer();