module.exports = (sequelize, Sequelize) => {
  const Employee = sequelize.define("employee", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nombre: {
      type: Sequelize.STRING,
      allowNull: false
    },
    puesto: {
      type: Sequelize.STRING
    },
    telefono: {
      type: Sequelize.STRING
    }
  });

  return Employee;
};
