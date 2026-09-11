module.exports = app => {
  const additionalServices = require("../controllers/additionalService.controller.js");
  var router = require("express").Router();

  // Crear un nuevo servicio adicional
  router.post("/", additionalServices.create);

  // Obtener todos los servicios adicionales
  router.get("/", additionalServices.findAll);

  // Obtener un servicio por ID
  router.get("/:id", additionalServices.findOne);

  // Actualizar un servicio por ID
  router.put("/:id", additionalServices.update);

  // Eliminar un servicio por ID
  router.delete("/:id", additionalServices.delete);

  // Endpoint montado en /api/services (o /api/additional-services si prefieres)
  app.use("/api/services", router);
};