const { productsModel } = require('../models');

const validateExistingId = async (req, res, next) => {
  const sales = req.body;

  const undefinedId = sales.some(({ productId }) => !productId);

  if (undefinedId) return res.status(400).json({ message: '"productId" is required' });

  next();
};

const validateProductFound = async (req, res, next) => {
  const sales = req.body;
  const allProducts = await productsModel.findAll();

  const teste = sales.every(({ productId }) => allProducts.some((e) => e.id === productId));

  if (!teste) return res.status(404).json({ message: 'Product not found' });

  next();
};

module.exports = {
  validateExistingId,
  validateProductFound,
};