const { Customer, Address, Sequelize, sequelize } = require('../models');

const { Op } = Sequelize;

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
  async list(req, res) {
    const { search } = req.query;
    const fieldsToSearch = ['name', 'email', 'phone', 'cpf'];
    /* gera um objeto onde cara campo de fieldsToSearch recebe um objeto
    na forma { [Op.like]: `%${search}%` } caso search tenha valor  não nulo */
    const where = search
      ? {
          [Op.or]: fieldsToSearch.reduce(
            (acc, field) => ({ ...acc, [field]: { [Op.like]: `%${search}%` } }),
            {},
          ),
        }
      : {};

    const customers = await Customer.findAll({
      attributes: { exclude: ['createdAt'] },
      include: [Customer.Addresses],
      where,
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
