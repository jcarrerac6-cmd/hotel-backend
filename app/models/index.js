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

// RELACIONES
// Cliente -> Reservas
//db.client.hasMany(db.booking, { foreignKey: 'clientId' });
//db.booking.belongsTo(db.client, { foreignKey: 'clientId' });
db.client.hasMany(db.booking, { foreignKey: 'client_id' });
db.booking.belongsTo(db.client, { foreignKey: 'client_id' });

// Habitación -> Reservas
//db.room.hasMany(db.booking, { foreignKey: 'roomId' });
//db.booking.belongsTo(db.room, { foreignKey: 'roomId' });
db.room.hasMany(db.booking, { foreignKey: 'room_id' });
db.booking.belongsTo(db.room, { foreignKey: 'room_id' });

// Reserva -> Factura
db.booking.hasOne(db.invoice, { foreignKey: 'bookingId' });
db.invoice.belongsTo(db.booking, { foreignKey: 'bookingId' });

// Cliente -> Factura
db.client.hasMany(db.invoice, { foreignKey: 'clientId' });
db.invoice.belongsTo(db.client, { foreignKey: 'clientId' });

// Factura -> Detalle de Factura
db.invoice.hasMany(db.invoiceDetail, { foreignKey: 'invoiceId' });
db.invoiceDetail.belongsTo(db.invoice, { foreignKey: 'invoiceId' });

// Servicio Adicional -> Detalle de Factura
db.additionalService.hasMany(db.invoiceDetail, { foreignKey: 'serviceId' });
db.invoiceDetail.belongsTo(db.additionalService, { foreignKey: 'serviceId' });

// Factura -> Pago
db.invoice.hasOne(db.payment, { foreignKey: 'invoiceId' });
db.payment.belongsTo(db.invoice, { foreignKey: 'invoiceId' });

module.exports = db;