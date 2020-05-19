const faker = require('faker');
const { Customer } = require('../../src/models');

const getFakeData = (data = {}) => ({
  name: faker.name.findName(),
  cpf: faker.phone.phoneNumber('###########'),
  phone: faker.phone.phoneNumber('###########'),
  email: faker.internet.email(),
  ...data,
});

module.exports = {
  create(count = 1, data = {}) {
    return Customer.bulkCreate(this.build(count, data));
  },
  build(count = 1, data = {}) {
    const customers = [];
    for (let i = 0; i < count; i++) {
      customers.push(
        getFakeData(
          count === 1
            ? data
            : { ...data, cpf: i.toString(), email: `${i.toString()}@test.com` },
        ),
      );
    }
    return customers;
  },
};
