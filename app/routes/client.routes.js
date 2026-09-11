module.exports = app => {
  const clients = require("../controllers/client.controller.js");
  var router = require("express").Router();

  router.post("/", clients.create);
  router.get("/", clients.findAll);
  router.get("/:id", clients.findOne);
  router.put("/:id", clients.update);
  router.delete("/:id", clients.delete);

  app.use("/api/clients", router);
};