import dotenv from 'dotenv';
// Carga el archivo de entorno correcto según NODE_ENV
let envFile = '.env';
if (process.env.NODE_ENV === 'development') envFile = '.env.dev';
else if (process.env.NODE_ENV === 'test') envFile = '.env.test';
dotenv.config({ path: envFile });
import { Sequelize } from 'sequelize';


const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    port: process.env.DB_PORT,
    logging: false, // opcional
  }
);

export default sequelize;
