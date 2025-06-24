import express from 'express';
import { getBooks, getBookById, getAllAuthors } from '../controllers/BookController.js';

const router = express.Router();

router.get('/', getBooks);         // GET /api/books
router.get(':author:genre', getBooks); // GET /api/books?author=nombre&genre=nombre
router.get('/:id', getBookById);   // GET /api/books/:id
router.get('/authors', getAllAuthors); // GET /api/books/authors

export default router;
