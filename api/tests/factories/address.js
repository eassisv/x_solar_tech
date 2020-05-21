const faker = require('faker');

const getFakeData = (data = {}) => ({
  cep: faker.phone.phoneNumber('########'),
  city: faker.address.city(),
  state: faker.address.state(),
  neighborhood: faker.address.county(),
  street: faker.address.streetName(),
  number: faker.random.number(1000),
  others: faker.address.secondaryAddress(),
  ...data,
});

module.exports = {
  build(count = 1, data = {}) {
    const address = [];
    for (let i = 0; i < count; i++) {
      address.push(getFakeData(data));
    }
    return address;
  },
};
