module.exports = (sequelize, Sequelize) => {
  const Room = sequelize.define("room", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    numero: {
      type: Sequelize.STRING,
      allowNull: false
    },
    tipo: {
      type: Sequelize.STRING
    },
    precio: {
      type: Sequelize.DECIMAL(10, 2)
    },
    estado: {
      type: Sequelize.STRING,
      defaultValue: "disponible"
    }
  });

  return Room;
};