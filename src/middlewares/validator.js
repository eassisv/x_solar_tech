module.exports = (schema) => async (req, res, next) => {
  try {
    const data = await schema.validate(req.body, { abortEarly: false });
    req.data = data;
    next();
  } catch (err) {
    return res.status(400).json(err);
  }
};
