/* eslint-disable no-template-curly-in-string */
const digitsOnly = {
  name: 'digits-only',
  message: '${path} must contain only numbers',
  test: (value) => /^[0-9]*$/.test(value),
};

const noDuplicate = (model, field) => ({
  name: 'no-duplicate',
  message: '${path} already registered',
  test: async (value) => {
    const result = await model.findOne({
      where: { [field]: value },
      attributes: ['id'],
    });
    return !result;
  },
});

module.exports = { digitsOnly, noDuplicate };
