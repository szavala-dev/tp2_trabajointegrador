import bcrypt from 'bcryptjs';
import { User, Genre, Book, Review } from '../models/index.js';

export async function seedDemo() {
  try {
    console.log('Conectando a la base de datos:', process.env.DB_NAME, 'en host:', process.env.DB_HOST, 'como usuario:', process.env.DB_USER);

    // Borrar datos existentes (orden: reviews, books, genres, users) sin truncate para evitar errores de FK
    await Review.destroy({ where: {} });
    await Book.destroy({ where: {} });
    await Genre.destroy({ where: {} });
    await User.destroy({ where: {} });
    console.log('Tablas limpiadas');

    // Usuarios de ejemplo
    const users = [
      {
        userName: 'admin',
        mail: 'admin@demo.com',
        pass: await bcrypt.hash('password123', 10),
        role: 'admin',
        membership: true
      },
      {
        userName: 'uploader',
        mail: 'uploader@demo.com',
        pass: await bcrypt.hash('password123', 10),
        role: 'uploader',
        membership: false
      },
      {
        userName: 'user',
        mail: 'user@demo.com',
        pass: await bcrypt.hash('password123', 10),
        role: 'user',
        membership: false
      }
    ];
    const createdUsers = await User.bulkCreate(users, { returning: true });
    console.log('Usuarios insertados');

    // Géneros de ejemplo
    const genres = [
      { name: 'Ficción' },
      { name: 'No Ficción' },
      { name: 'Ciencia' },
      { name: 'Historia' }
    ];
    const createdGenres = await Genre.bulkCreate(genres, { returning: true });
    console.log('Géneros insertados');

    // Libros de ejemplo
    const books = [
      {
        title: 'El Principito',
        author: 'Antoine de Saint-Exupéry',
        GenreId: createdGenres[0].id,
        UserId: createdUsers[1].id // uploader
      },
      {
        title: 'Breve historia del tiempo',
        author: 'Stephen Hawking',
        GenreId: createdGenres[2].id,
        UserId: createdUsers[1].id // uploader
      }
    ];
    const createdBooks = await Book.bulkCreate(books, { returning: true });
    console.log('Libros insertados');

    // Reviews de ejemplo
    const reviews = [
      {
        rating: 5,
        comment: 'Obra maestra para todas las edades.',
        UserId: createdUsers[2].id, // user
        BookId: createdBooks[0].id  // El Principito
      },
      {
        rating: 4,
        comment: 'Muy interesante y profundo.',
        UserId: createdUsers[1].id, // uploader
        BookId: createdBooks[1].id  // Breve historia del tiempo
      }
    ];
    await Review.bulkCreate(reviews);
    console.log('Reviews insertadas');

    console.log('Seed finalizado correctamente');
  } catch (err) {
    console.error('Error en el seed:', err);
  }
}

// Para ejecutar desde CLI en ES Modules
if (
  (import.meta.url === `file://${process.argv[1]}`) ||
  (process.argv[1] && process.argv[1].endsWith('seedDemo.mjs'))
) {
  try {
    const db = await import('../config/database.js');
    await seedDemo();
    process.exit(0);
  } catch (err) {
    console.error('Error ejecutando el seed:', err);
    process.exit(1);
  }
} else {
  console.log('El script no se está ejecutando como archivo principal.');
}
