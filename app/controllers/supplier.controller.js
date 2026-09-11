const db = require("../models");
const Supplier = db.supplier;

// Crear un proveedor
exports.create = async (req, res) => {
  try {
    const { nombre, contacto, telefono, email } = req.body;
    if (!nombre) {
      return res.status(400).send({ message: "El nombre es obligatorio." });
    }
    const supplier = await Supplier.create({ nombre, contacto, telefono, email });
    res.status(201).send(supplier);
  } catch (error) {
    res.status(500).send({ message: error.message || "Error al crear proveedor." });
  }
};

// Obtener todos los proveedores
exports.findAll = async (req, res) => {
  try {
    const suppliers = await Supplier.findAll();
    res.send(suppliers);
  } catch (error) {
    res.status(500).send({ message: error.message || "Error al obtener proveedores." });
  }
};

// Obtener un proveedor por ID
exports.findOne = async (req, res) => {
  try {
    const id = req.params.id;
    const supplier = await Supplier.findByPk(id);
    if (!supplier) {
      return res.status(404).send({ message: `Proveedor con id=${id} no encontrado.` });
    }
    res.send(supplier);
  } catch (error) {
    res.status(500).send({ message: error.message || "Error al obtener proveedor." });
  }
};

// Actualizar un proveedor por ID
exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    const [updated] = await Supplier.update(req.body, { where: { id: id } });
    if (updated) {
      const updatedSupplier = await Supplier.findByPk(id);
      return res.send({ message: "Proveedor actualizado correctamente.", supplier: updatedSupplier });
    }
    res.status(404).send({ message: `No se pudo actualizar el proveedor con id=${id}.` });
  } catch (error) {
    res.status(500).send({ message: error.message || "Error al actualizar proveedor." });
  }
};

// Eliminar un proveedor por ID
exports.delete = async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await Supplier.destroy({ where: { id: id } });
    if (deleted) {
      return res.send({ message: "Proveedor eliminado correctamente." });
    }
    res.status(404).send({ message: `No se encontró el proveedor con id=${id}.` });
  } catch (error) {
    res.status(500).send({ message: error.message || "Error al eliminar proveedor." });
  }
};