module.exports = (sequelize, Sequelize) => {
  const Invoice = sequelize.define("invoice", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    total: {
      type: Sequelize.DECIMAL(10, 2),
      defaultValue: 0.00
    },
    fecha: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    },
    clientId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      field: "clientId"
    },
    bookingId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      field: "bookingId"
    }
  }, {
    tableName: "invoices"
  });

  return Invoice;
};