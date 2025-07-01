require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USER || 'szavala',
    password: process.env.DB_PASSWORD || 'bGRN1SKawynrZ/[K',
    database: process.env.DB_NAME || 'mi_libreria',
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql',
    logging: false
  },
  test: {
    username: process.env.DB_USER || 'szavala',
    password: process.env.DB_PASSWORD || 'bGRN1SKawynrZ/[K',
    database: process.env.DB_NAME || 'mi_libreria',
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql',
    logging: false
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false
  }
};
