// Servicio de libros
export default function BookService({ Book, Genre }) {
  async function createBook({ title, author, GenreId }) {
    return await Book.create({ title, author, GenreId });
  }

  async function getBooks({ page = 1, limit = 10 } = {}) {
    return await Book.findAndCountAll({
      include: Genre,
      offset: (page - 1) * limit,
      limit
    });
  }

  async function getBookById(id) {
    const book = await Book.findByPk(id, { include: Genre });
    if (!book) throw new Error('Libro no encontrado');
    return book;
  }

  async function updateBook(id, { title, author, GenreId }) {
    const book = await Book.findByPk(id);
    if (!book) throw new Error('Libro no encontrado');
    book.title = title;
    book.author = author;
    book.GenreId = GenreId;
    await book.save();
    return book;
  }

  async function deleteBook(id) {
    const book = await Book.findByPk(id);
    if (!book) throw new Error('Libro no encontrado');
    await book.destroy();
    return { message: 'Libro eliminado' };
  }

  return { createBook, getBooks, getBookById, updateBook, deleteBook };
}
