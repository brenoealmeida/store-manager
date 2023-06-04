const { expect } = require('chai');
const sinon = require('sinon');
const { productsModel } = require('../../../src/models');

const connection = require('../../../src/models/connection');
const allProducts = require('./mocks/products.model.mock');

describe('Teste unitário do model de produtos', async function () {
  afterEach(function () {
    sinon.restore();
  });

  it('Recuperando a lista completa de produtos', async function () {
    sinon.stub(connection, 'execute').resolves([allProducts]);
    const result = await productsModel.findAll();
    expect(result).to.be.deep.equal(allProducts);
  });

  it('Recuperando um produto pelo seu ID', async function () {
    sinon.stub(connection, 'execute').resolves([[allProducts[0]]]);
    const result = await productsModel.findById(1);
    expect(result).to.be.deep.equal(allProducts[0]);
  });

  it('Cadastrando um novo produto', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 42 }])
    const result = await productsModel.createNew('Teste');
    expect(result).to.be.equal(42);
  });

});
