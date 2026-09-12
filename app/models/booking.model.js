module.exports = (sequelize, Sequelize) => {
  const Booking = sequelize.define("booking", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    fecha_entrada: {
      type: Sequelize.DATEONLY,
      allowNull: false
    },
    fecha_salida: {
      type: Sequelize.DATEONLY,
      allowNull: false
    },
    estado: {
      type: Sequelize.STRING,
      defaultValue: "activa"
    },
    client_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    room_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    }
  }, {
    tableName: "bookings"
  });

  return Booking;
};