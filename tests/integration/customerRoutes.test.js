/* eslint-disable no-undef */
const request = require('supertest');
const app = require('../../src/app');
const { sequelize } = require('../../src/models');

const { createCustomers } = require('../utils');

describe('Customer routes and methods', () => {
  beforeAll(() => {
    sequelize.options.logging = false;
  });

  afterEach(async () => {
    await sequelize.truncate();
  });

  test('get method returns all registered customers', async () => {
    const customers = await createCustomers(2);
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
});
