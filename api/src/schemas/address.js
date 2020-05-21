const Yup = require('yup');
const { digitsOnly } = require('./customSchemaValidators');

const address = Yup.object().shape({
  cep: Yup.string().length(8).test(digitsOnly).required(),
  city: Yup.string().max(255).required(),
  state: Yup.string().max(255).required(),
  neighborhood: Yup.string().max(255).required(),
  street: Yup.string().max(255).required(),
  number: Yup.number().min(0).required(),
  others: Yup.string().max(255),
});

module.exports = address;
