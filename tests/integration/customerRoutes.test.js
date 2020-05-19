/* eslint-disable no-undef */
const request = require('supertest');

const app = require('../../src/app');
const { sequelize } = require('../../src/models');
const customerFactory = require('../factories/customer');
const addressFactory = require('../factories/address');

describe('Customer routes and methods', () => {
  afterEach(async () => {
    await sequelize.truncate();
  });

  test('get method returns all registered customers', async () => {
    const customers = await customerFactory.create(2);
    const res = await request(app).get('/customers/');
    expect(res.body).toEqual(
      expect.arrayContaining(
        customers.map((customer) => ({
          ...customer.get(),
          createdAt: customer.get('createdAt').toJSON(),
          updatedAt: customer.get('updatedAt').toJSON(),
        })),
      ),
    );
    expect(res.body.length).toBe(customers.length);
    expect(res.status).toBe(200);
  });

  test('customers can be created', async () => {
    const customer = customerFactory.build()[0];
    customer.addresses = addressFactory.build(2);
    const res = await request(app).post('/customers/').send(customer);
    expect(res.body).toHaveProperty('id');
    expect(res.status).toBe(201);
  });
});
