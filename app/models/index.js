const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");

const sequelize = process.env.DATABASE_URL 
  ? new Sequelize(process.env.DATABASE_URL, {
      dialect: "postgres",
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false
        }
      },
      pool: dbConfig.pool
    })
  : new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
      host: dbConfig.HOST,
      dialect: dbConfig.dialect,
      pool: dbConfig.pool
    });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Importar todos los modelos
db.client = require("./client.model.js")(sequelize, Sequelize);
db.employee = require("./employee.model.js")(sequelize, Sequelize);
db.supplier = require("./supplier.model.js")(sequelize, Sequelize);
db.room = require("./room.model.js")(sequelize, Sequelize);
db.booking = require("./booking.model.js")(sequelize, Sequelize);
db.additionalService = require("./additionalService.model.js")(sequelize, Sequelize);
db.invoice = require("./invoice.model.js")(sequelize, Sequelize);
db.invoiceDetail = require("./invoiceDetail.model.js")(sequelize, Sequelize);
db.payment = require("./payment.model.js")(sequelize, Sequelize);

// RELACIONES DEFINIDAS EXPLÍCITAMENTE CON MAPEO DE CAMPO
// Cliente -> Reservas
db.client.hasMany(db.booking, { foreignKey: { name: 'clientId', field: 'clientId' } });
db.booking.belongsTo(db.client, { foreignKey: { name: 'clientId', field: 'clientId' } });

// Habitación -> Reservas
db.room.hasMany(db.booking, { foreignKey: { name: 'roomId', field: 'roomId' } });
db.booking.belongsTo(db.room, { foreignKey: { name: 'roomId', field: 'roomId' } });

// Reserva -> Factura
db.booking.hasOne(db.invoice, { foreignKey: { name: 'bookingId', field: 'bookingId' } });
db.invoice.belongsTo(db.booking, { foreignKey: { name: 'bookingId', field: 'bookingId' } });

// Cliente -> Factura
db.client.hasMany(db.invoice, { foreignKey: { name: 'clientId', field: 'clientId' } });
db.invoice.belongsTo(db.client, { foreignKey: { name: 'clientId', field: 'clientId' } });

// Factura -> Detalle de Factura
db.invoice.hasMany(db.invoiceDetail, { foreignKey: { name: 'invoiceId', field: 'invoiceId' } });
db.invoiceDetail.belongsTo(db.invoice, { foreignKey: { name: 'invoiceId', field: 'invoiceId' } });

// Servicio Adicional -> Detalle de Factura
db.additionalService.hasMany(db.invoiceDetail, { foreignKey: { name: 'serviceId', field: 'serviceId' } });
db.invoiceDetail.belongsTo(db.additionalService, { foreignKey: { name: 'serviceId', field: 'serviceId' } });

// Factura -> Pago
db.invoice.hasOne(db.payment, { foreignKey: { name: 'invoiceId', field: 'invoiceId' } });
db.payment.belongsTo(db.invoice, { foreignKey: { name: 'invoiceId', field: 'invoiceId' } });

module.exports = db;