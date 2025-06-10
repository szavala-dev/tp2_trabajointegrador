import bookService from "../services/BookService.js";

class BookController {
  bookService = new BookService();

  getAllBookController = async (req, res) => {
    try {
      const books = await this.bookService.getAllBookService();
      res.status(200).send({
        success: true,
        message: books,
      });
    } catch (error) {
      res.status(400).send({
        success: false,
        message: error.message,
      });
    }
  };

  getBookByIdController = (req, res) => {
    const book = this.bookService.getlBookServiceById();
    res.status(200).send({
      success: true,
      message: book,
    });
  };

  createBookController = async (req, res) => {
    try {
      const { name, mail, pass } = req.body;
      const book = await this.bookService.createBookService({
        name,
        mail,
        pass,
      });
      console.log(`🚀 ~ BookController ~ createBookController= ~ book:`, book);
      res.status(201).send({
        success: true,
        message: book,
      });
    } catch (error) {
      res.status(400).send({
        success: false,
        message: error.message,
      });
    }
  };
}

export default BookController;
