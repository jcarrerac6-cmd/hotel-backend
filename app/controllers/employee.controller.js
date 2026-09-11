const db = require("../models");
const Employee = db.employee;

// Crear un nuevo empleado
exports.create = async (req, res) => {
  try {
    const { nombre, puesto, telefono, email } = req.body;
    if (!nombre) {
      return res.status(400).send({ message: "El nombre es obligatorio." });
    }
    const employee = await Employee.create({ nombre, puesto, telefono, email });
    res.status(201).send(employee);
  } catch (error) {
    res.status(500).send({ message: error.message || "Error al crear empleado." });
  }
};

// Obtener todos los empleados
exports.findAll = async (req, res) => {
  try {
    const employees = await Employee.findAll();
    res.send(employees);
  } catch (error) {
    res.status(500).send({ message: error.message || "Error al obtener empleados." });
  }
};

// Obtener un empleado por ID
exports.findOne = async (req, res) => {
  try {
    const id = req.params.id;
    const employee = await Employee.findByPk(id);
    if (!employee) {
      return res.status(404).send({ message: `Empleado con id=${id} no encontrado.` });
    }
    res.send(employee);
  } catch (error) {
    res.status(500).send({ message: error.message || "Error al obtener empleado." });
  }
};

// Actualizar un empleado por ID
exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    const [updated] = await Employee.update(req.body, { where: { id: id } });
    if (updated) {
      const updatedEmployee = await Employee.findByPk(id);
      return res.send({ message: "Empleado actualizado correctamente.", employee: updatedEmployee });
    }
    res.status(404).send({ message: `No se pudo actualizar el empleado con id=${id}.` });
  } catch (error) {
    res.status(500).send({ message: error.message || "Error al actualizar empleado." });
  }
};

// Eliminar un empleado por ID
exports.delete = async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await Employee.destroy({ where: { id: id } });
    if (deleted) {
      return res.send({ message: "Empleado eliminado correctamente." });
    }
    res.status(404).send({ message: `No se encontró el empleado con id=${id}.` });
  } catch (error) {
    res.status(500).send({ message: error.message || "Error al eliminar empleado." });
  }
};