const { Customer } = require('../models');

module.exports = {
  async list(_, res) {
    const customers = await Customer.findAll();
    res.json(customers);
  },
};
