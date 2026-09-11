const db = require("../models");
const Client = db.client;

// Crear un cliente
exports.create = async (req, res) => {
  try {
    const { nombre, nit, telefono, email } = req.body;
    if (!nombre) {
      return res.status(400).send({ message: "El nombre es obligatorio." });
    }
    const client = await Client.create({ nombre, nit, telefono, email });
    res.status(201).send(client);
  } catch (error) {
    res.status(500).send({ message: error.message || "Error al crear cliente." });
  }
};

// Obtener todos los clientes
exports.findAll = async (req, res) => {
  try {
    const clients = await Client.findAll();
    res.send(clients);
  } catch (error) {
    res.status(500).send({ message: error.message || "Error al obtener clientes." });
  }
};

// Obtener un cliente por ID
exports.findOne = async (req, res) => {
  try {
    const id = req.params.id;
    const client = await Client.findByPk(id);
    if (!client) {
      return res.status(404).send({ message: `Cliente con id=${id} no encontrado.` });
    }
    res.send(client);
  } catch (error) {
    res.status(500).send({ message: error.message || "Error al obtener cliente." });
  }
};

// Actualizar un cliente por ID
exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    const [updated] = await Client.update(req.body, { where: { id: id } });
    if (updated) {
      const updatedClient = await Client.findByPk(id);
      return res.send({ message: "Cliente actualizado correctamente.", client: updatedClient });
    }
    res.status(404).send({ message: `No se pudo actualizar el cliente con id=${id}.` });
  } catch (error) {
    res.status(500).send({ message: error.message || "Error al actualizar cliente." });
  }
};

// Eliminar un cliente por ID
exports.delete = async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await Client.destroy({ where: { id: id } });
    if (deleted) {
      return res.send({ message: "Cliente eliminado correctamente." });
    }
    res.status(404).send({ message: `No se encontró el cliente con id=${id}.` });
  } catch (error) {
    res.status(500).send({ message: error.message || "Error al eliminar cliente." });
  }
};