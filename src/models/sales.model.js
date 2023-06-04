const camelize = require('camelize');
const connection = require('./connection');

const insertSales = async (newSales) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUE (NOW())',
  );

  const values = newSales
    .map((item) => `(${insertId}, ${item.productId}, ${item.quantity})`)
    .join(', ');

  await connection.execute(
    `INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES ${values}`,
  );

  return insertId;
};

const findAll = async () => {
  const fields = 'p.sale_id, s.date, p.product_id, p.quantity';
  const SPTable = 'StoreManager.sales_products';
  const [result] = await connection.execute(
    `SELECT ${fields} FROM ${SPTable} AS p INNER JOIN StoreManager.sales AS s ON s.id = p.sale_id`,
  );

  return camelize(result);
};

const findById = async (id) => {
  const fields = 'p.sale_id, s.date, p.product_id, p.quantity';
  const SPTable = 'StoreManager.sales_products';
  const [result] = await connection.execute(
    `SELECT ${fields} FROM ${SPTable} AS p INNER JOIN StoreManager.sales AS s ON s.id = p.sale_id`,
  );
  
  const camelcase = camelize(result);
  
  const sale = camelcase.filter((e) => e.saleId === Number(id))
    .map((s) => ({
      date: s.date,
      productId: s.productId,
      quantity: s.quantity,
  }));

  if (sale.length === 0) return undefined;

  return sale;
};

module.exports = {
  insertSales,
  findAll,
  findById,
};