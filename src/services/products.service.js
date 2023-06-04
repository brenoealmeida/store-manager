const { productsModel } = require('../models');

const findAll = async () => {
  const productsList = await productsModel.findAll();

  // refatorar
  return { type: null, message: productsList };
};

const findById = async (id) => {
  const product = await productsModel.findById(id);

  if (!product) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };

  return { type: null, message: product };
};

const createNew = async (newProductName) => {
  const newId = await productsModel.createNew(newProductName);
  const newProduct = await productsModel.findById(newId);

  return { type: null, message: newProduct };
};

const update = async (id, name) => {
  const changedRows = await productsModel.update(id, name);

  if (!changedRows) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };

  return { type: null, message: { id, name } };
};

module.exports = {
  findAll,
  findById,
  createNew,
  update,
};
