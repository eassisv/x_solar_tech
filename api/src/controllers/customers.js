const { Customer, Address, sequelize } = require('../models');

const normalizeEmail = (email) => {
  const [emailName, domain] = email.split('@');
  return `${emailName}@${domain.toLowerCase()}`;
};

const performQueriesWithTransaction = async (queries) => {
  let transaction;
  try {
    transaction = await sequelize.transaction();
    const results = await Promise.all(
      queries.map((query) => query(transaction)),
    );
    await transaction.commit();
    return results;
  } catch (err) {
    console.log(err);
    await transaction.rollback();
    return [];
  }
};

module.exports = {
  async list(_, res) {
    const customers = await Customer.findAll({
      attributes: { exclude: ['createdAt'] },
      include: [Customer.Addresses],
    });
    res.json(customers);
  },

  async store(req, res) {
    const data = { ...req.data, email: normalizeEmail(req.data.email) };
    const [customer] = await performQueriesWithTransaction([
      (transaction) =>
        Customer.create(data, { include: [Customer.Addresses], transaction }),
    ]);
    if (customer) return res.status(201).json(customer);
    return res.status(500).json();
  },

  async update(req, res) {
    const { instance, data } = req;
    const [customer] = await performQueriesWithTransaction([
      (transaction) =>
        instance.update(data, {
          include: [Customer.Addresses],
          transaction,
        }),
      (transaction) =>
        Address.destroy({
          where: { customerId: instance.get('id') },
          transaction,
        }),
      (transaction) =>
        Address.bulkCreate(
          data.addresses.map((address) => ({
            ...address,
            customerId: instance.get('id'),
          })),
          { transaction },
        ),
    ]);

    if (customer) {
      return res.json(await customer.reload({ include: [Customer.Addresses] }));
    }
    return res.status(500).json();
  },

  async delete(req, res) {
    req.instance.destroy();
    res.json();
  },
};
