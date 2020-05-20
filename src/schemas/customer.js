const Yup = require('yup');
const { Customer } = require('../models');
const { digitsOnly, noDuplicate } = require('./customSchemaValidators');
const addressSchema = require('./address');

const customer = Yup.object().shape({
  name: Yup.string().required().max(255),
  cpf: Yup.string()
    .length(11)
    .test(digitsOnly)
    .when('$instance', (instance, schema) =>
      schema.test(noDuplicate(Customer, 'cpf', instance)),
    )
    .required(),
  phone: Yup.string().length(11).test(digitsOnly).required(),
  email: Yup.string()
    .email()
    .when('$instance', (instance, schema) =>
      schema.test(noDuplicate(Customer, 'email', instance)),
    )
    .required(),
  addresses: Yup.array().of(addressSchema).min(1).required(),
});

module.exports = customer;
