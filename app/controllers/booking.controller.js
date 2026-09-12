const db = require("../models");
const Booking = db.booking;
const Client = db.client;
const Room = db.room;

// Crear reserva
exports.create = async (req, res) => {
  try {
    const { fechaEntrada, fechaSalida, estado, clientId, roomId } = req.body;

    if (!fechaEntrada || !fechaSalida || !clientId || !roomId) {
      return res.status(400).send({ 
        message: "Campos requeridos: fechaEntrada, fechaSalida, clientId, roomId." 
      });
    }

    const booking = await Booking.create({
      fechaEntrada,
      fechaSalida,
      estado: estado || "activa",
      clientId: parseInt(clientId, 10),
      roomId: parseInt(roomId, 10)
    });

    res.status(201).send(booking);
  } catch (error) {
    res.status(500).send({ message: error.message || "Error al crear la reserva." });
  }
};

// Obtener todas las reservas
exports.findAll = async (req, res) => {
  try {
    const bookings = await Booking.findAll({
      include: [
        { model: Client, attributes: ["id", "nombre", "email"] },
        { model: Room, attributes: ["id", "numero", "tipo", "precio"] }
      ]
    });
    res.send(bookings);
  } catch (error) {
    res.status(500).send({ message: error.message || "Error al obtener reservas." });
  }
};

// Obtener una reserva por ID
exports.findOne = async (req, res) => {
  try {
    const id = req.params.id;
    const booking = await Booking.findByPk(id, {
      include: [
        { model: Client, attributes: ["id", "nombre", "email"] },
        { model: Room, attributes: ["id", "numero", "tipo", "precio"] }
      ]
    });
    if (!booking) {
      return res.status(404).send({ message: `Reserva con id=${id} no encontrada.` });
    }
    res.send(booking);
  } catch (error) {
    res.status(500).send({ message: error.message || "Error al obtener la reserva." });
  }
};

// Actualizar una reserva
exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    const [updated] = await Booking.update(req.body, { where: { id: id } });
    if (updated) {
      return res.send({ message: "Reserva actualizada con éxito." });
    }
    res.status(404).send({ message: `No se pudo actualizar la reserva con id=${id}.` });
  } catch (error) {
    res.status(500).send({ message: error.message || "Error al actualizar la reserva." });
  }
};

// Eliminar una reserva
exports.delete = async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await Booking.destroy({ where: { id: id } });
    if (deleted) {
      return res.send({ message: "Reserva eliminada con éxito." });
    }
    res.status(404).send({ message: `No se encontró la reserva con id=${id}.` });
  } catch (error) {
    res.status(500).send({ message: error.message || "Error al eliminar la reserva." });
  }
};