/* eslint-disable no-template-curly-in-string */
const digitsOnly = {
  name: 'digits-only',
  message: '${path} must contain only numbers',
  test: (value) => /^[0-9]*$/.test(value),
};

const noDuplicate = (model, field, instance) => ({
  name: 'no-duplicate',
  message: '${path} already registered',
  test: async (value) => {
    if (!value) return true;
    const result = await model.findOne({
      where: { [field]: value },
      attributes: ['id', field],
    });
    console.log('result', result.get(), 'instance', instance.get());
    return !instance
      ? !result
      : !result || result.get()[field] === instance.get()[field];
  },
});

module.exports = { digitsOnly, noDuplicate };
