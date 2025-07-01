import BookService from '../services/BookService.js';
import { errorResponse } from '../utils/errorResponse.js';

export function makeBookController({ Book, Genre }) {
  const bookService = BookService({ Book, Genre });
  return {
    async create(req, res) {
      try {
        const { title, author, GenreId } = req.body;
        if (!title || !author || !GenreId) {
          return res.status(400).json({ error: 'Datos de libro inválidos' });
        }
        const result = await bookService.createBook({ title, author, GenreId });
        res.status(201).json(result);
      } catch (err) {
        errorResponse(res, err);
      }
    },
    async getAll(req, res) {
      try {
        // Paginación: ?page=1&limit=10
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const books = await bookService.getBooks({ page, limit });
        res.json(books);
      } catch (err) {
        errorResponse(res, err);
      }
    },
    async getById(req, res) {
      try {
        const book = await bookService.getBookById(req.params.id);
        res.json(book);
      } catch (err) {
        errorResponse(res, err, 404);
      }
    },
    async update(req, res) {
      try {
        const { id } = req.params;
        const result = await bookService.updateBook(id, req.body);
        res.json(result);
      } catch (err) {
        errorResponse(res, err);
      }
    },
    async delete(req, res) {
      try {
        const { id } = req.params;
        const result = await bookService.deleteBook(id);
        res.json(result);
      } catch (err) {
        errorResponse(res, err);
      }
    }
  };
}
