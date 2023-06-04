const { expect } = require('chai');
const sinon = require('sinon');

const { productsModel } = require('../../../src/models');
const { productsService } = require('../../../src/services');

const { allProductsModelResponse, newProduct } = require('./mocks/products.service.mocks');

describe('Teste unitário do service de produtos', async function () {
  afterEach(function () {
    sinon.restore();
  });

  it('Recuperando a lista completa de produtos', async function () {
    sinon.stub(productsModel, 'findAll').resolves(allProductsModelResponse);
    const results = await productsService.findAll();
    expect(results.message).to.be.deep.equal(allProductsModelResponse);
  });

  it('Recuperando um produto pelo seu ID', async function () {
    sinon.stub(productsModel, 'findById').resolves(allProductsModelResponse[0]);
    const results = await productsService.findById(1);
    expect(results.message).to.be.deep.equal(allProductsModelResponse[0]);
  });

  it('Tentando recuperar um produto com ID inválido', async function () {
    sinon.stub(productsModel, 'findById').resolves(undefined);
    const results = await productsService.findById('a');
    expect(results.message).to.be.equal('Product not found');
    expect(results.type).to.be.equal('PRODUCT_NOT_FOUND');
  });

  it('Cadastrando um novo produto', async function () {
    sinon.stub(productsModel, 'createNew').resolves(42);
    sinon.stub(productsModel, 'findById').resolves(newProduct);

    const results = await productsService.createNew(newProduct.name);

    expect(results.message).to.be.deep.equal(newProduct);
  })

});