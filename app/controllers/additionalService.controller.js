const db = require("../models");
const AdditionalService = db.additionalService;

exports.create = async (req, res) => {
  try {
    const service = await AdditionalService.create(req.body);
    res.status(201).send(service);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.findAll = async (req, res) => {
  try {
    const services = await AdditionalService.findAll();
    res.send(services);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};