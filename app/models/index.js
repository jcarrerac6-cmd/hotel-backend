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

// RELACIONES DEFINIDAS EXPLÍCITAMENTE CON MAPEO DE CLAVE Y CAMPO
// Cliente -> Reservas
db.client.hasMany(db.booking, { foreignKey: 'clientId', sourceKey: 'id' });
db.booking.belongsTo(db.client, { foreignKey: 'clientId', targetKey: 'id' });

// Habitación -> Reservas
db.room.hasMany(db.booking, { foreignKey: 'roomId', sourceKey: 'id' });
db.booking.belongsTo(db.room, { foreignKey: 'roomId', targetKey: 'id' });

// Reserva -> Factura
db.booking.hasOne(db.invoice, { foreignKey: 'bookingId', sourceKey: 'id' });
db.invoice.belongsTo(db.booking, { foreignKey: 'bookingId', targetKey: 'id' });

// Cliente -> Factura
db.client.hasMany(db.invoice, { foreignKey: 'clientId', sourceKey: 'id' });
db.invoice.belongsTo(db.client, { foreignKey: 'clientId', targetKey: 'id' });

// Factura -> Detalle de Factura
db.invoice.hasMany(db.invoiceDetail, { foreignKey: 'invoiceId', sourceKey: 'id' });
db.invoiceDetail.belongsTo(db.invoice, { foreignKey: 'invoiceId', targetKey: 'id' });

// Servicio Adicional -> Detalle de Factura
db.additionalService.hasMany(db.invoiceDetail, { foreignKey: 'serviceId', sourceKey: 'id' });
db.invoiceDetail.belongsTo(db.additionalService, { foreignKey: 'serviceId', targetKey: 'id' });

// Factura -> Pago
db.invoice.hasOne(db.payment, { foreignKey: 'invoiceId', sourceKey: 'id' });
db.payment.belongsTo(db.invoice, { foreignKey: 'invoiceId', targetKey: 'id' });

module.exports = db;