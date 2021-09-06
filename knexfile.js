import { resolve } from 'path';

module.exports = {
  client: 'sqlite3',
  connection: {
    filename: resolve(__dirname, 'src', 'db', 'database.sql'),
  },
};
