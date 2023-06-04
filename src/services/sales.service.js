const { salesModel } = require('../models');

const insertSales = async (newSales) => {
  const newId = await salesModel.insertSales(newSales);
  const newSale = {
    id: newId,
    itemsSold: newSales,
  };

  return { type: null, message: newSale };
};

const findAll = async () => {
  const salesList = await salesModel.findAll();

  salesList.sort((a, b) => (
    a.saleId === b.saleId ? a.productId - b.productId : a.saleId - b.saleId));
  // refatorar
  return { type: null, message: salesList };
};

const findById = async (id) => {
  const sale = await salesModel.findById(id);

  if (!sale) return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };

  return { type: null, message: sale };
};

module.exports = {
  insertSales,
  findAll,
  findById,
};