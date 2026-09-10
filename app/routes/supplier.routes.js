const controller = require("../controllers/supplier.controller");

module.exports = function(app) {
  app.post("/api/suppliers", controller.create);
  app.get("/api/suppliers", controller.findAll);
};