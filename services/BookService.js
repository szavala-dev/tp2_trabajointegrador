import { Book, Book } from "../models/index.js";

class BookService {
  getAllBookService = async () => {
    const books = await Book.findAll({
      attributes: ["id", "bookName", "uploadDate"],
      include: {
        model: User,
        attributes: ["userName"],
        model: Genre,
        attributes: ["genreName"]
      },
    });
    return books;
  };
  getlBookServiceById = () => {
    return "Get all books Services";
  };

  createBookService = async (data) => {
    const book = await Book.create(data);
    return book.name;
  };
}

export default BookService;
