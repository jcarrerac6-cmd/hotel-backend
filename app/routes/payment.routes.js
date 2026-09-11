module.exports = app => {
  const payments = require("../controllers/payment.controller.js");
  var router = require("express").Router();

  router.post("/", payments.create);
  router.get("/", payments.findAll);
  router.get("/:id", payments.findOne);

  app.use("/api/payments", router);
};