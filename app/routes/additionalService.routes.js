module.exports = app => {
  const additionalServices = require("../controllers/additionalService.controller.js");
  var router = require("express").Router();

  router.post("/", additionalServices.create);
  router.get("/", additionalServices.findAll);
  router.get("/:id", additionalServices.findOne);
  router.put("/:id", additionalServices.update);
  router.delete("/:id", additionalServices.delete);

  app.use("/api/services", router);
};