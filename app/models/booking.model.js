module.exports = (sequelize, Sequelize) => {
  const Booking = sequelize.define("booking", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    fechaEntrada: {
      type: Sequelize.DATEONLY,
      allowNull: false
    },
    fechaSalida: {
      type: Sequelize.DATEONLY,
      allowNull: false
    },
    estado: {
      type: Sequelize.STRING,
      defaultValue: "activa"
    },
    clientId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      field: "client_id"
    },
    roomId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      field: "room_id"
    }
  }, {
    tableName: "bookings",
    underscored: true
  });

  return Booking;
};