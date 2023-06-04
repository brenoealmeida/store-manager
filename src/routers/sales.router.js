const express = require('express');
const { salesController } = require('../controllers');
const idValidations = require('../middlewares/validateSalesID');
const quantityValidations = require('../middlewares/validateSalesQuantity');

const router = express.Router();

router.post(
  '/',
  idValidations.validateExistingId,
  quantityValidations.validateQuantity,
  idValidations.validateProductFound,
  salesController.insertSales,
);

router.get(
  '/',
  salesController.listSales,
);

router.get(
  '/:id',
  salesController.getProduct,
);

module.exports = router;