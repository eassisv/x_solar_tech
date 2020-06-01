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

/* gera um objeto onde cara campo de fieldsToSearch recebe um objeto
  na forma { [Op.like]: `%${search}%` } caso search tenha valor  não nulo */
const fieldsToSearch = ['name', 'email', 'phone', 'cpf'];
const getFilterObj = (search) =>
  search
    ? {
        [Op.or]: fieldsToSearch.reduce(
          (acc, field) => ({ ...acc, [field]: { [Op.iLike]: `%${search}%` } }),
          {},
        ),
      }
    : {};

const getPageNumber = (page) => {
  const parsedPage = Number(page);
  return Number.isInteger(parsedPage) && parsedPage > 0 ? parsedPage : 1;
};

module.exports = {
  async list(req, res) {
    const { search } = req.query;
    const where = getFilterObj(search);

    const page = getPageNumber(req.query.page);
    const pageSize = 20;
    const offset = (page - 1) * pageSize;

    try {
      const { count, rows } = await Customer.findAndCountAll({
        distinct: true,
        include: [Customer.Addresses],
        order: ['updatedAt', 'createdAt', 'name'],
        limit: pageSize,
        offset,
        where,
      });
      res.json({
        page,
        numPages: Math.ceil(count / pageSize),
        customers: rows,
      });
    } catch (err) {
      res.status(500).json();
    }
  },

  async get(req, res) {
    return res.json(req.instance);
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
    await req.instance.destroy();

    return res.json();
  },
};
