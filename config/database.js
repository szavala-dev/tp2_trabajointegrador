import { Sequelize } from 'sequelize';
import { ENV_VARIABLES } from './config';

const sequelize = new Sequelize(ENV_VARIABLES.DB_NAME, ENV_VARIABLES.DB_USER, ENV_VARIABLES.DB_PASSWORD, {
  host: ENV_VARIABLES.DB_HOST,
  dialect: 'mysql'
});

export default sequelize;