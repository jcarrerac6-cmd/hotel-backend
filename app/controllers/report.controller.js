// Reportes del sistema
exports.getGeneralReport = async (req, res) => {
  try {
    res.send({
      message: "Reporte general generado con éxito.",
      fecha: new Date(),
      estadoHotel: "Operacional"
    });
  } catch (error) {
    res.status(500).send({ message: error.message || "Error al generar reporte." });
  }
};