const getErrorObj = (error) => ({ type: error.type, error: error.errors });

module.exports = (schema) => async (req, res, next) => {
  try {
    const data = await schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
      context: { instance: req.instance },
    });
    req.data = data;
    return next();
  } catch (err) {
    if (err.inner) {
      const errors = err.inner.reduce(
        (acc, error) => ({
          ...acc,
          [error.path]: acc[error.path]
            ? [...acc[error.path], getErrorObj(error)]
            : [getErrorObj(error)],
        }),
        {},
      );
      return res.status(400).json({ errors });
    }
    return next(err);
  }
};
