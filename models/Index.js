import Book from "./Book.js";
import Genre from "./Genre.js";
import User from "./User.js";
import Review from "./Review.js";

// Un usuario puede subir muchos libros
User.hasMany(Book, { foreignKey: 'UserId' });
Book.belongsTo(User, { foreignKey: 'UserId' });

// Un libro pertenece a un género, un género tiene muchos libros
Genre.hasMany(Book, { foreignKey: 'GenreId' });
Book.belongsTo(Genre, { foreignKey: 'GenreId' });

// Un usuario puede hacer muchas reviews, una review pertenece a un usuario
User.hasMany(Review, { foreignKey: 'UserId' });
Review.belongsTo(User, { foreignKey: 'UserId' });

// Un libro puede tener muchas reviews, una review pertenece a un libro
Book.hasMany(Review, { foreignKey: 'BookId' });
Review.belongsTo(Book, { foreignKey: 'BookId' });

export {User, Book, Genre, Review}
