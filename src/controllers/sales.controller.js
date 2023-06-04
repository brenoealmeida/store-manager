const { salesService } = require('../services');
const errorMap = require('../utils/errorMap');

const insertSales = async (req, res) => {
  const newSales = req.body;

  const { message } = await salesService.insertSales(newSales);

  res.status(201).json(message);
};

const listSales = async (_req, res) => {
  const { type, message } = await salesService.findAll();

  if (type) res.status(errorMap.mapError(type)).json({ message });

  res.status(200).json(message);
};

const getProduct = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await salesService.findById(id);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  return res.status(200).json(message);
};

module.exports = {
  insertSales,
  listSales,
  getProduct,
};