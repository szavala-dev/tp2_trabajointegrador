import Book from '../models/Book.js';
import Genre from '../models/Genre.js';

export async function createBook(req, res, next) {
  try {
    const { title, author, GenreId } = req.body;
    const book = await Book.create({ title, author, GenreId });
    res.status(201).json(book);
  } catch (error) {
    next(error);
  }
}

export async function getBooks(req, res, next) {
  try {
    const books = await Book.findAll({ include: Genre });
    res.json(books);
  } catch (error) {
    next(error);
  }
}

export async function getBookById(req, res, next) {
  try {
    const { id } = req.params;
    const book = await Book.findByPk(id, { include: Genre });
    if (!book) return res.status(404).json({ error: "Libro no encontrado" });
    res.json(book);
  } catch (error) {
    next(error);
  }
}

export async function updateBook(req, res, next) {
  try {
    const { id } = req.params;
    const { title, author, GenreId } = req.body;
    const book = await Book.findByPk(id);
    if (!book) return res.status(404).json({ error: "Libro no encontrado" });
    book.title = title;
    book.author = author;
    book.GenreId = GenreId;
    await book.save();
    res.json(book);
  } catch (error) {
    next(error);
  }
}

export async function deleteBook(req, res, next) {
  try {
    const { id } = req.params;
    const book = await Book.findByPk(id);
    if (!book) return res.status(404).json({ error: "Libro no encontrado" });
    await book.destroy();
    res.json({ message: "Libro eliminado" });
  } catch (error) {
    next(error);
  }
}