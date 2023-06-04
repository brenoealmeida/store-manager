const Joi = require('joi');

const productSchema = Joi.string().min(5).required();

module.exports = {
  productSchema,
};
