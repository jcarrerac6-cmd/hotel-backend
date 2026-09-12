module.exports = (sequelize, Sequelize) => {
  const Booking = sequelize.define("booking", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    fechaEntrada: {
      type: Sequelize.DATEONLY,
      allowNull: false,
      field: "fechaEntrada"
    },
    fechaSalida: {
      type: Sequelize.DATEONLY,
      allowNull: false,
      field: "fechaSalida"
    },
    estado: {
      type: Sequelize.STRING,
      defaultValue: "activa"
    },
    clientId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      field: "clientId"
    },
    roomId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      field: "roomId"
    }
  }, {
    tableName: "bookings",
    timestamps: true
  });

  return Booking;
};