const db = require("../models");
const Employee = db.employee;

// Login básico para empleados
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      return res.status(400).send({ message: "El correo es requerido." });
    }
    
    // Busca el empleado por email
    const employee = await Employee.findOne({ where: { email: email } });
    if (!employee) {
      return res.status(404).send({ message: "Usuario o correo no encontrado." });
    }

    res.send({
      message: "Inicio de sesión exitoso.",
      user: {
        id: employee.id,
        nombre: employee.nombre,
        puesto: employee.puesto,
        email: employee.email
      }
    });
  } catch (error) {
    res.status(500).send({ message: error.message || "Error en el inicio de sesión." });
  }
};