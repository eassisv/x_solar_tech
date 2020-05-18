const { Customer, sequelize } = require('../models');

const normalizeEmail = (email) => {
  const [emailName, domain] = email.split('@');
  return `${emailName}@${domain.toLowerCase()}`;
};

module.exports = {
  async list(_, res) {
    const customers = await Customer.findAll();
    res.json(customers);
  },

  async store(req, res) {
    let transaction;
    const data = {
      ...req.data,
      email: normalizeEmail(req.data.email),
    };
    try {
      transaction = await sequelize.transaction();
      const customer = await Customer.create(data, {
        include: [Customer.Addresses],
        transaction,
      });
      await transaction.commit();
      res.status(201).json(customer);
    } catch (err) {
      await transaction.rollback();
      res.status(500).json();
    }
  },
};
