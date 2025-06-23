import Book from '../models/Book.js';

// GET /api/books
export async function getBooks(req, res) {
  try {
    const { author, title, page = 1, limit = 10 } = req.query;

    const where = {};
    if (author) where.author = author;
    if (title) where.title = title;

    const offset = (parseInt(page) - 1) * parseInt(limit);

    const books = await Book.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset: offset,
    });

    res.json({
      total: books.count,
      currentPage: parseInt(page),
      totalPages: Math.ceil(books.count / limit),
      data: books.rows,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// GET /api/books/:id
export async function getBookById(req, res) {
  try {
    const { id } = req.params;
    const book = await Book.findByPk(id);

    if (!book) {
      return res.status(404).json({ error: 'Libro no encontrado' });
    }

    res.json(book);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getAllAuthors(req, res) {
  try {
    const authors = await Book.findAll({
      attributes: ['author'],
      group: ['author'],
    });

    res.json(authors.map(author => author.author));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
