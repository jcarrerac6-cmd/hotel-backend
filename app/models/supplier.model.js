module.exports = (sequelize, Sequelize) => {
  const Supplier = sequelize.define("supplier", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nombre: {
      type: Sequelize.STRING,
      allowNull: false
    },
    empresa: {
      type: Sequelize.STRING
    },
    telefono: {
      type: Sequelize.STRING
    }
  });

  return Supplier;
};