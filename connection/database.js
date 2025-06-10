const { Sequelize } = require('sequelize');


const sequelize = new Sequelize('mi_libreria', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = sequelize;
