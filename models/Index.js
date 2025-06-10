import Book from "./Book.js";
import User from "./User.js";
import Genre from "./Genre.js";
import Review from "./Review.js";


User.hasMany(Book)
Book.hasOne(User)

Book.hasOne(Genre)
Genre.hasMany(Book)


User.hasMany(Review)
Review.hasOne(User)

Book.hasMany(Review)
Review.hasOne(Book)


export {User, Book, Genre, Review}
