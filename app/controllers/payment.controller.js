const db = require("../models");
const Payment = db.payment;

// Crear un pago
exports.create = async (req, res) => {
  try {
    const { monto, metodo, fecha, invoiceId } = req.body;
    if (!monto || !invoiceId) {
      return res.status(400).send({ message: "El monto e invoiceId son requeridos." });
    }
    const payment = await Payment.create({ monto, metodo, fecha, invoiceId });
    res.status(201).send(payment);
  } catch (error) {
    res.status(500).send({ message: error.message || "Error al registrar el pago." });
  }
};

// Obtener todos los pagos
exports.findAll = async (req, res) => {
  try {
    const payments = await Payment.findAll();
    res.send(payments);
  } catch (error) {
    res.status(500).send({ message: error.message || "Error al obtener los pagos." });
  }
};

// Obtener un pago por ID
exports.findOne = async (req, res) => {
  try {
    const id = req.params.id;
    const payment = await Payment.findByPk(id);
    if (!payment) {
      return res.status(404).send({ message: `Pago con id=${id} no encontrado.` });
    }
    res.send(payment);
  } catch (error) {
    res.status(500).send({ message: error.message || "Error al obtener el pago." });
  }
};