module.exports = (sequelize, Sequelize) => {
  const Payment = sequelize.define("payment", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    monto: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false
    },
    metodoPago: {
      type: Sequelize.STRING
    },
    fecha: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    }
  });

  return Payment;
};