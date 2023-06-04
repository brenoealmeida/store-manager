const express = require('express');
const { productsController } = require('../controllers');
const validateProduct = require('../middlewares/validateProducts');

const router = express.Router();

router.get(
  '/',
  productsController.listProducts,
);

router.get(
  '/:id',
  productsController.getProduct,
);

router.post(
  '/',
  validateProduct,
  productsController.createProduct,
);

router.put(
  '/:id',
  validateProduct,
  productsController.updateProduct,
);

module.exports = router;