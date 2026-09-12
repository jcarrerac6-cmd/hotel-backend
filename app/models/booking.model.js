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
    }
  }, {
    tableName: "bookings",
    underscored: true // TRADUCE AUTOMÁTICAMENTE clientId -> client_id EN POSTGRES
  });

  return Booking;
};