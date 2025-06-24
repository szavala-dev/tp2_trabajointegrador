import dotenv from 'dotenv';
// Carga el archivo de entorno correcto según NODE_ENV
let envFile = '.env';
if (process.env.NODE_ENV === 'development') envFile = '.env.dev';
else if (process.env.NODE_ENV === 'test') envFile = '.env.test';
dotenv.config({ path: envFile });
import validateEnv from './config/validateEnv.js';
validateEnv();
import express from 'express';
import sequelize from './config/database.js';
import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js';
import genreRoutes from './routes/genreRoutes.js';
import bookRoutes from './routes/bookRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';
import cookieParser from 'cookie-parser';


const app = express();
app.use(express.json());
app.use(cookieParser());

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/genres', genreRoutes);
app.use('/api/books', bookRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
});