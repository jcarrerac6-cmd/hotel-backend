const db = require("../models");
const Supplier = db.supplier;

exports.create = async (req, res) => {
  try {
    const supplier = await Supplier.create(req.body);
    res.status(201).send(supplier);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.findAll = async (req, res) => {
  try {
    const suppliers = await Supplier.findAll();
    res.send(suppliers);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};