const controller = require("../controllers/report.controller");

module.exports = function(app) {
  app.get("/api/reports/occupancy", controller.getOccupancyByDate);
  app.get("/api/reports/top-services", controller.getTopServices);
};