const Yup = require('yup');
const { digitsOnly } = require('./customSchemaValidators');
const addressSchema = require('./address');

const customer = Yup.object().shape({
  name: Yup.string().required().max(255),
  cpf: Yup.string().length(11).test(digitsOnly).required(),
  phone: Yup.string().length(11).test(digitsOnly).required(),
  email: Yup.string().email().required(),
  addresses: Yup.array().of(addressSchema).min(1).required(),
});

module.exports = customer;
