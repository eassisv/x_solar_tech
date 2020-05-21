module.exports = (model) => async (req, res, next) => {
  const { customerId } = req.params;
  const intRgx = /^[0-9]+$/;
  if (intRgx.test(customerId)) {
    const instance = await model.findByPk(customerId);
    if (instance) {
      req.instance = instance;
      return next();
    }
  }
  return res.status(404).json();
};
