const db = require("../models");
const AdditionalService = db.additionalService;

// Crear un nuevo servicio adicional
exports.create = async (req, res) => {
  try {
    const { nombre, precio, descripcion } = req.body;
    if (!nombre || !precio) {
      return res.status(400).send({ message: "El nombre y precio son obligatorios." });
    }
    const service = await AdditionalService.create({ nombre, precio, descripcion });
    res.status(201).send(service);
  } catch (error) {
    res.status(500).send({ message: error.message || "Error al crear el servicio." });
  }
};

// Obtener todos los servicios
exports.findAll = async (req, res) => {
  try {
    const services = await AdditionalService.findAll();
    res.send(services);
  } catch (error) {
    res.status(500).send({ message: error.message || "Error al obtener los servicios." });
  }
};

// Obtener un servicio por ID
exports.findOne = async (req, res) => {
  try {
    const id = req.params.id;
    const service = await AdditionalService.findByPk(id);
    if (!service) {
      return res.status(404).send({ message: `Servicio con id=${id} no encontrado.` });
    }
    res.send(service);
  } catch (error) {
    res.status(500).send({ message: error.message || "Error al obtener el servicio." });
  }
};

// Actualizar un servicio
exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    const [updated] = await AdditionalService.update(req.body, { where: { id: id } });
    if (updated) {
      const updatedService = await AdditionalService.findByPk(id);
      return res.send({ message: "Servicio actualizado correctamente.", service: updatedService });
    }
    res.status(404).send({ message: `No se pudo actualizar el servicio con id=${id}.` });
  } catch (error) {
    res.status(500).send({ message: error.message || "Error al actualizar el servicio." });
  }
};

// Eliminar un servicio
exports.delete = async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await AdditionalService.destroy({ where: { id: id } });
    if (deleted) {
      return res.send({ message: "Servicio eliminado correctamente." });
    }
    res.status(404).send({ message: `No se encontró el servicio con id=${id}.` });
  } catch (error) {
    res.status(500).send({ message: error.message || "Error al eliminar el servicio." });
  }
};