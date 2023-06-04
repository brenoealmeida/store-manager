const camelize = require('camelize');
const connection = require('./connection');

const findAll = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.products',
  );

  return camelize(result);
};

const findById = async (productId) => {
  const [[product]] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?',
    [productId],
  );
  return camelize(product);
};

const createNew = async (newProductName) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.products (name) VALUE (?)',
    [newProductName],
  );
  return insertId;
};

const update = async (id, name) => {
  const [result] = await connection.execute(
    `UPDATE StoreManager.products 
      SET name = ? WHERE id = ?`,
    [name, id],
  );
  return result.changedRows;
};

module.exports = {
  findAll,
  findById,
  createNew,
  update,
};
