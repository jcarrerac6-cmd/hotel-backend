const db = require("../models");
const Employee = db.employee;

exports.create = async (req, res) => {
  try {
    const employee = await Employee.create(req.body);
    res.status(201).send(employee);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.findAll = async (req, res) => {
  try {
    const employees = await Employee.findAll();
    res.send(employees);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};