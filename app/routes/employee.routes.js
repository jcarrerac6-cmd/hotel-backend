const controller = require("../controllers/employee.controller");

module.exports = function(app) {
  app.post("/api/employees", controller.create);
  app.get("/api/employees", controller.findAll);
};