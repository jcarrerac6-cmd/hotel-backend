const db = require("../models");
const Invoice = db.invoice;

// Crear una factura
exports.create = async (req, res) => {
  try {
    const { total, fecha, clientId, bookingId } = req.body;
    if (!total || !clientId) {
      return res.status(400).send({ message: "El total y clientId son obligatorios." });
    }
    const invoice = await Invoice.create({ total, fecha, clientId, bookingId });
    res.status(201).send(invoice);
  } catch (error) {
    res.status(500).send({ message: error.message || "Error al crear la factura." });
  }
};

// Obtener todas las facturas
exports.findAll = async (req, res) => {
  try {
    const invoices = await Invoice.findAll();
    res.send(invoices);
  } catch (error) {
    res.status(500).send({ message: error.message || "Error al obtener facturas." });
  }
};

// Obtener una factura por ID
exports.findOne = async (req, res) => {
  try {
    const id = req.params.id;
    const invoice = await Invoice.findByPk(id);
    if (!invoice) {
      return res.status(404).send({ message: `Factura con id=${id} no encontrada.` });
    }
    res.send(invoice);
  } catch (error) {
    res.status(500).send({ message: error.message || "Error al obtener la factura." });
  }
};