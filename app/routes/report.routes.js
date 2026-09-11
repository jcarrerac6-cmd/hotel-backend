module.exports = app => {
  const reports = require("../controllers/report.controller.js");
  var router = require("express").Router();

  router.get("/general", reports.getGeneralReport);

  app.use("/api/reports", router);
};