require('dotenv/config');
const { resolve } = require('path');

module.exports = {
  client: 'pg',
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    ssl:
      process.env.NODE_ENV === 'production'
        ? { rejectUnauthorized: false }
        : undefined,
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    extension: 'js',
    tableName: 'migrations',
    directory: resolve(__dirname, 'src', 'db', 'migrations'),
  },
  seeds: {
    directory: resolve(__dirname, 'src', 'db', 'seeds'),
  },
};
