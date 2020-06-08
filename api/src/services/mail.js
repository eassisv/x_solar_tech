const nodemailer = require('nodemailer');

const { host, port, secure, auth, defaults } = require('../../config/mail');

const transporter = nodemailer.createTransport(
  {
    host,
    port,
    secure,
    auth,
  },
  defaults,
);

module.exports = transporter;
