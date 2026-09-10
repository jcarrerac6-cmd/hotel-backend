const controller = require("../controllers/additionalService.controller");

module.exports = function(app) {
  app.post("/api/services", controller.create);
  app.get("/api/services", controller.findAll);
};