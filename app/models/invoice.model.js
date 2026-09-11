module.exports = (sequelize, Sequelize) => {
  const Invoice = sequelize.define("invoice", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    fecha: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    },
    total: {
      type: Sequelize.DECIMAL(10, 2),
      defaultValue: 0.00
    }
  });

  return Invoice;
};