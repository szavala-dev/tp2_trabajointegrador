import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('biblioteca_online', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

export default sequelize;