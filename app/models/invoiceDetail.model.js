module.exports = (sequelize, Sequelize) => {
  const InvoiceDetail = sequelize.define("invoiceDetail", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    cantidad: {
      type: Sequelize.INTEGER,
      defaultValue: 1
    },
    subtotal: {
      type: Sequelize.DECIMAL(10, 2)
    }
  });

  return InvoiceDetail;
};