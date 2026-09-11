const db = require("../models");
const Room = db.room;

// Crear una nueva habitación
exports.create = async (req, res) => {
  try {
    const { numero, tipo, precio, estado } = req.body;
    if (!numero || !precio) {
      return res.status(400).send({ message: "El número y precio son obligatorios." });
    }
    const room = await Room.create({ numero, tipo, precio, estado });
    res.status(201).send(room);
  } catch (error) {
    res.status(500).send({ message: error.message || "Error al crear la habitación." });
  }
};

// Obtener todas las habitaciones
exports.findAll = async (req, res) => {
  try {
    const rooms = await Room.findAll();
    res.send(rooms);
  } catch (error) {
    res.status(500).send({ message: error.message || "Error al obtener las habitaciones." });
  }
};

// Obtener una habitación por ID
exports.findOne = async (req, res) => {
  try {
    const id = req.params.id;
    const room = await Room.findByPk(id);
    if (!room) {
      return res.status(404).send({ message: `No se encontró la habitación con id=${id}.` });
    }
    res.send(room);
  } catch (error) {
    res.status(500).send({ message: error.message || "Error al obtener la habitación." });
  }
};

// Actualizar una habitación
exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    const [updated] = await Room.update(req.body, { where: { id: id } });
    if (updated) {
      const updatedRoom = await Room.findByPk(id);
      return res.send({ message: "Habitación actualizada correctamente.", room: updatedRoom });
    }
    res.status(404).send({ message: `No se pudo actualizar la habitación con id=${id}.` });
  } catch (error) {
    res.status(500).send({ message: error.message || "Error al actualizar la habitación." });
  }
};

// Eliminar una habitación
exports.delete = async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await Room.destroy({ where: { id: id } });
    if (deleted) {
      return res.send({ message: "Habitación eliminada correctamente." });
    }
    res.status(404).send({ message: `No se encontró la habitación con id=${id}.` });
  } catch (error) {
    res.status(500).send({ message: error.message || "Error al eliminar la habitación." });
  }
};