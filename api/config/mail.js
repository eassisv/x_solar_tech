require('dotenv').config();

module.exports = {
  host: process.env.MAIL_HOST || 'smtp.mailtrap.io',
  port: process.env.MAIL_PORT || 2525,
  secure: process.env.MAIL_SECURE === 'true',
  auth: {
    user: process.env.MAIL_AUTH_USER || '77c6af4855aaef',
    pass: process.env.MAIL_AUTH_PASS || 'a4b9be88e3d851',
  },
  defaults: {
    from: 'X Solar Tech <noreply@xsolartech.com>',
    to: process.env.MAIL_TO || 'Gerente de Vendas <joao.gerente@xsolartech.com',
    subject: 'Novo cliente cadastrado',
  },
};
