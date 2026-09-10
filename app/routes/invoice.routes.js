const controller = require("../controllers/invoice.controller");

module.exports = function(app) {
  app.post("/api/invoices", controller.createInvoice);
};