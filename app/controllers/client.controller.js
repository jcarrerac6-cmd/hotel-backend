const db = require("../models");
const Client = db.client;

exports.create = async (req, res) => {
  try {
    const client = await Client.create(req.body);
    res.status(201).send(client);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.findAll = async (req, res) => {
  try {
    const clients = await Client.findAll();
    res.send(clients);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};