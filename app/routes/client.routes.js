const controller = require("../controllers/client.controller.js");

module.exports = function(app) {
  app.post("/api/clients", controller.create);
  app.get("/api/clients", controller.findAll);
};