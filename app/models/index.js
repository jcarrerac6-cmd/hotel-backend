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

// Importar modelos
db.client = require("./client.model.js")(sequelize, Sequelize);
db.employee = require("./employee.model.js")(sequelize, Sequelize);
db.supplier = require("./supplier.model.js")(sequelize, Sequelize);
db.room = require("./room.model.js")(sequelize, Sequelize);
db.booking = require("./booking.model.js")(sequelize, Sequelize);
db.additionalService = require("./additionalService.model.js")(sequelize, Sequelize);
db.invoice = require("./invoice.model.js")(sequelize, Sequelize);
db.invoiceDetail = require("./invoiceDetail.model.js")(sequelize, Sequelize);
db.payment = require("./payment.model.js")(sequelize, Sequelize);

// RELACIONES CORREGIDAS CON MAPEAMIENTO EXACTO (client_id y room_id)
db.client.hasMany(db.booking, { foreignKey: 'client_id' });
db.booking.belongsTo(db.client, { foreignKey: 'client_id' });

db.room.hasMany(db.booking, { foreignKey: 'room_id' });
db.booking.belongsTo(db.room, { foreignKey: 'room_id' });

db.booking.hasOne(db.invoice, { foreignKey: 'booking_id' });
db.invoice.belongsTo(db.booking, { foreignKey: 'booking_id' });

db.client.hasMany(db.invoice, { foreignKey: 'client_id' });
db.invoice.belongsTo(db.client, { foreignKey: 'client_id' });

db.invoice.hasMany(db.invoiceDetail, { foreignKey: 'invoice_id' });
db.invoiceDetail.belongsTo(db.invoice, { foreignKey: 'invoice_id' });

db.additionalService.hasMany(db.invoiceDetail, { foreignKey: 'service_id' });
db.invoiceDetail.belongsTo(db.additionalService, { foreignKey: 'service_id' });

db.invoice.hasOne(db.payment, { foreignKey: 'invoice_id' });
db.payment.belongsTo(db.invoice, { foreignKey: 'invoice_id' });

module.exports = db;