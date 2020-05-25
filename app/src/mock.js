import faker from "faker";

export function createFakeCustomerList(count = 20) {
  const customerList = [];
  for (let i = 0; i < count; ++i)
    customerList.push({
      id: i,
      name: faker.name.findName(),
      email: faker.internet.email(),
      cpf: faker.phone.phoneNumber("###########"),
      phone: faker.phone.phoneNumber("###########"),
    });
  return customerList;
}
