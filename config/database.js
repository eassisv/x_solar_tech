require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: 'xsolartech',
    host: '127.0.0.1',
    dialect: 'postgres',
  },
  test: {
    username: 'sqlite',
    password: null,
    database: 'xsolartech_test',
    dialect: 'sqlite',
    storate: './tests/database.sqlite',
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'postgres',
  },
};
