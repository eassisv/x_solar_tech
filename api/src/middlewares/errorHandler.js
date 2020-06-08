/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
module.exports = (err, req, res, next) => {
  console.log(err);
  return res.status(500).json({ detail: '500 Internal Server Error' });
};
