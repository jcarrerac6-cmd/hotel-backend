const db = require("../models");
const Booking = db.booking;
const Client = db.client;
const Room = db.room;

exports.create = async (req, res) => {
  try {
    const { fechaEntrada, fechaSalida, estado, clientId, roomId } = req.body;

    if (!fechaEntrada || !fechaSalida || !clientId || !roomId) {
      return res.status(400).send({ 
        message: "Faltan campos obligatorios: fechaEntrada, fechaSalida, clientId, roomId." 
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