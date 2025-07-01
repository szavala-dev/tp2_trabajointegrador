import User from '../models/User.js';
import Book from '../models/Book.js';
import Genre from '../models/Genre.js';
import Review from '../models/Review.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { makeAuthController } from '../controllers/authController.js';
import { makeUserController } from '../controllers/userController.js';
import { makeBookController } from '../controllers/bookController.js';
import { makeGenreController } from '../controllers/genreController.js';
import { makeReviewController } from '../controllers/reviewController.js';
import { makeFileController } from '../controllers/fileController.js';

export const container = {
  User,
  bcrypt,
  jwt,
  authController: makeAuthController({ User, bcrypt, jwt }),
  userController: makeUserController({ User, bcrypt }),
  Book,
  Genre,
  bookController: makeBookController({ Book, Genre }),
  genreController: makeGenreController({ Genre }),
  Review,
  reviewController: makeReviewController({ Review, Book, User }),
  fileController: makeFileController()
};
