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
      define: {
        underscored: true // Traduce automáticamente clientId -> client_id en PostgreSQL
      },
      pool: dbConfig.pool
    })
  : new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
      host: dbConfig.HOST,
      dialect: dbConfig.dialect,
      define: {
        underscored: true
      },
      pool: dbConfig.pool
    });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Cargar todos los modelos
db.client = require("./client.model.js")(sequelize, Sequelize);
db.employee = require("./employee.model.js")(sequelize, Sequelize);
db.supplier = require("./supplier.model.js")(sequelize, Sequelize);
db.room = require("./room.model.js")(sequelize, Sequelize);
db.booking = require("./booking.model.js")(sequelize, Sequelize);
db.additionalService = require("./additionalService.model.js")(sequelize, Sequelize);
db.invoice = require("./invoice.model.js")(sequelize, Sequelize);
db.invoiceDetail = require("./invoiceDetail.model.js")(sequelize, Sequelize);
db.payment = require("./payment.model.js")(sequelize, Sequelize);

// RELACIONES (Sequelize asigna las llaves foráneas automáticas alineadas con PostgreSQL)
db.client.hasMany(db.booking);
db.booking.belongsTo(db.client);

db.room.hasMany(db.booking);
db.booking.belongsTo(db.room);

db.booking.hasOne(db.invoice);
db.invoice.belongsTo(db.booking);

db.client.hasMany(db.invoice);
db.invoice.belongsTo(db.client);

db.invoice.hasMany(db.invoiceDetail);
db.invoiceDetail.belongsTo(db.invoice);

db.additionalService.hasMany(db.invoiceDetail);
db.invoiceDetail.belongsTo(db.additionalService);

db.invoice.hasOne(db.payment);
db.payment.belongsTo(db.invoice);

module.exports = db;