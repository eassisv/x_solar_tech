const faker = require('faker');
const { UniqueConstraintError } = require('sequelize');
const { Customer } = require('../src/models');

module.exports = {
  createCustomers(count = 1) {
    const generateFakeData = () => {
      return {
        name: faker.name.findName(),
        cpf: faker.phone.phoneNumber('###########'),
        phone: faker.phone.phoneNumber('###########'),
        email: faker.internet.email(),
      };
    };
    const customers = [];
    for (let i = 0; i < count; ) {
      try {
        const customer = Customer.create(generateFakeData());
        customers.push(customer);
        i += 1;
      } catch (err) {
        if (!(err instanceof UniqueConstraintError)) throw err;
      }
    }
    return count === 1 ? customers[0] : Promise.all(customers);
  },
};
