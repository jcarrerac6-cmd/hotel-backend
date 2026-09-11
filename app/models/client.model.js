module.exports = (sequelize, Sequelize) => {
  const Client = sequelize.define("client", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nombre: {
      type: Sequelize.STRING,
      allowNull: false
    },
    nit: {
      type: Sequelize.STRING
    },
    telefono: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    }
  });

  return Client;
};