const db = require("../models");
const Invoice = db.invoice;
const InvoiceDetail = db.invoiceDetail;

exports.createInvoice = async (req, res) => {
  try {
    const { clientId, bookingId, nitClient, details } = req.body;

    // Calcular montos
    let subtotal = 0;
    details.forEach(item => {
      subtotal += item.quantity * item.unitPrice;
    });

    const tax = subtotal * 0.12; // IVA 12%
    const total = subtotal + tax;

    // Generar correlativo simple de factura
    const invoiceNumber = "FAC-" + Date.now();

    const invoice = await Invoice.create({
      invoiceNumber,
      clientId,
      bookingId,
      nitClient: nitClient || "CF",
      subtotal,
      tax,
      total,
      paymentStatus: 'pending'
    });

    // Guardar detalle
    const detailsWithInvoiceId = details.map(item => ({
      ...item,
      invoiceId: invoice.id,
      subtotal: item.quantity * item.unitPrice
    }));

    await InvoiceDetail.bulkCreate(detailsWithInvoiceId);

    res.status(201).send({ invoice, details: detailsWithInvoiceId });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};