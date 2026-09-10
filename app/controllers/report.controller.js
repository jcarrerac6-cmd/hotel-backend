const db = require("../models");
const Booking = db.booking;
const InvoiceDetail = db.invoiceDetail;
const { Sequelize } = db;

// Indicador 1: Ocupación por Fecha
exports.getOccupancyByDate = async (req, res) => {
  try {
    const occupancy = await Booking.findAll({
      attributes: [
        'checkIn',
        [Sequelize.fn('COUNT', Sequelize.col('id')), 'totalBookings']
      ],
      group: ['checkIn']
    });
    res.send(occupancy);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Indicador 2: Servicios Adicionales Más Solicitados
exports.getTopServices = async (req, res) => {
  try {
    const topServices = await InvoiceDetail.findAll({
      attributes: [
        'serviceId',
        'description',
        [Sequelize.fn('SUM', Sequelize.col('quantity')), 'totalQuantity']
      ],
      where: { serviceId: { [Sequelize.Op.ne]: null } },
      group: ['serviceId', 'description'],
      order: [[Sequelize.literal('totalQuantity'), 'DESC']]
    });
    res.send(topServices);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};