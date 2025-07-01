import dotenv from 'dotenv';
let envFile = '.env';
if (process.env.NODE_ENV === 'development') envFile = '.env.dev';
dotenv.config({ path: envFile });

import validateEnv from './config/validateEnv.js';
validateEnv();

import express from 'express';
import sequelize from './config/database.js';
import { container } from './config/container.js';
import createAuthRoutes from './routes/authRoutes.js';
import createUserRoutes from './routes/userRoutes.js';
import createGenreRoutes from './routes/genreRoutes.js';
import createBookRoutes from './routes/bookRoutes.js';
import createReviewRoutes from './routes/reviewRoutes.js';
import createFileRoutes from './routes/fileRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';
import cookieParser from 'cookie-parser';


const app = express();
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', createAuthRoutes({ authController: container.authController }));
app.use('/api/users', createUserRoutes({ userController: container.userController }));
app.use('/api/genres', createGenreRoutes({ genreController: container.genreController }));
app.use('/api/books', createBookRoutes({ bookController: container.bookController }));
app.use('/api/books', createReviewRoutes({ reviewController: container.reviewController }));
app.use('/api/files', createFileRoutes({ fileController: container.fileController }));

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`Servidor escuchando en el puerto ${PORT}`));
});


export default app;