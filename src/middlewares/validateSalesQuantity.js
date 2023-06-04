const validateQuantity = (req, res, next) => {
  const sales = req.body;

  const undefinedQuantity = sales.some(({ quantity }) => (!quantity && quantity !== 0));
  const invalidNumber = sales.some(({ quantity }) => Number(quantity) <= 0);

  if (undefinedQuantity) return res.status(400).json({ message: '"quantity" is required' });
  if (invalidNumber) {
    return res.status(422).json({
      message: '"quantity" must be greater than or equal to 1',
    });
  }
  next();
};

module.exports = {
  validateQuantity,
};