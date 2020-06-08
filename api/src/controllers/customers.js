const { Customer, Address, Sequelize } = require('../models');
const { performQueriesWithTransaction } = require('../utils/database');
const transporter = require('../services/mail');

const { Op } = Sequelize;

const normalizeEmail = (email) => {
  const [emailName, domain] = email.split('@');
  return `${emailName}@${domain.toLowerCase()}`;
};

/* gera um objeto onde cada campo de fieldsToSearch recebe um objeto
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

const getEmailHtml = (customerName) =>
  `<div style="font-family: Arial, Helvetica, sans-serif; margin: 5px 0;">
  O cliente <strong>${customerName}</strong> foi cadastrado no sistema.</div>`;

module.exports = {
  async list(req, res, next) {
    try {
      const { search } = req.query;
      const where = getFilterObj(search);

      const page = getPageNumber(req.query.page);
      const pageSize = 20;
      const offset = (page - 1) * pageSize;

      const { count, rows } = await Customer.findAndCountAll({
        distinct: true,
        include: [Customer.Addresses],
        order: [
          ['updatedAt', 'DESC'],
          ['createdAt', 'DESC'],
          ['name', 'ASC'],
        ],
        limit: pageSize,
        offset,
        where,
      });

      return res.json({
        page,
        numPages: Math.ceil(count / pageSize),
        customers: rows,
      });
    } catch (err) {
      return next(err);
    }
  },

  async get(req, res, next) {
    try {
      const { instance } = req;
      await instance.reload({ include: [Customer.Addresses] });
      return res.json(instance);
    } catch (err) {
      return next(err);
    }
  },

  async store(req, res, next) {
    try {
      const data = { ...req.data, email: normalizeEmail(req.data.email) };
      const [customer] = await performQueriesWithTransaction([
        (transaction) =>
          Customer.create(data, { include: [Customer.Addresses], transaction }),
      ]);

      transporter.sendMail({
        text: `O cliente ${customer.get('name')} foi cadastrado no sistema.`,
        html: getEmailHtml(customer.get('name')),
      });

      return res.status(201).json(customer);
    } catch (err) {
      return next(err);
    }
  },

  async update(req, res, next) {
    try {
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
      return res.json(await customer.reload({ include: [Customer.Addresses] }));
    } catch (err) {
      return next(err);
    }
  },

  async delete(req, res, next) {
    try {
      await req.instance.destroy();
      return res.json();
    } catch (err) {
      return next(err);
    }
  },
};
