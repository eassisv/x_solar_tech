/* eslint-disable no-template-curly-in-string */
const digitsOnly = {
  name: 'digits-only',
  message: '${path} must contain only numbers',
  test: (value) => /^[0-9]*$/.test(value),
};

module.exports = { digitsOnly };
