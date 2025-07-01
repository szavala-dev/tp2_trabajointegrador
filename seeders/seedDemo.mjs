import bcrypt from 'bcryptjs'; 
import { User, Genre, Book, Review } from '../models/index.js';

export async function seedDemo() {
  try {
    console.log('Conectando a la base de datos:', process.env.DB_NAME, 'en host:', process.env.DB_HOST, 'como usuario:', process.env.DB_USER);

    // Limpiar tablas (orden para respetar FK)
    await Review.destroy({ where: {} });
    await Book.destroy({ where: {} });
    await Genre.destroy({ where: {} });
    await User.destroy({ where: {} });
    console.log('Tablas limpiadas');

    // Usuarios demo
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

    // Géneros demo
    const genres = [
      { name: 'Ficción' },
      { name: 'No Ficción' },
      { name: 'Ciencia' },
      { name: 'Terror' },
      { name: 'Aventura' },
      { name: 'Documental' },
      { name: 'Anime' },
      { name: 'Accion' },
      { name: 'Historia' }
    ];
    const createdGenres = await Genre.bulkCreate(genres, { returning: true });
    console.log('Géneros insertados');

    // Libros demo (solo 5 para que coincidan los índices)
    const books = [
      {
        title: 'Cien años de soledad',
        author: 'Gabriel García Márquez',
        GenreId: createdGenres[0].id,
        UserId: createdUsers[2].id // user
      },
      {
        title: '1984',
        author: 'George Orwell',
        GenreId: createdGenres[1].id,
        UserId: createdUsers[0].id // admin
      },
      {
        title: 'Orgullo y prejuicio',
        author: 'Jane Austen',
        GenreId: createdGenres[1].id,
        UserId: createdUsers[2].id // user
      },
      {
        title: 'Sapiens: De animales a dioses',
        author: 'Yuval Noah Harari',
        GenreId: createdGenres[2].id,
        UserId: createdUsers[1].id // uploader
      },
      {
        title: 'Don Quijote de la Mancha',
        author: 'Miguel de Cervantes',
        GenreId: createdGenres[0].id,
        UserId: createdUsers[1].id // uploader
      }
    ];
    const createdBooks = await Book.bulkCreate(books, { returning: true });
    console.log('Libros insertados');

    // Reviews demo (coincidir los índices!)
    const reviews = [
      {
        rating: 5,
        comment: 'Una historia fascinante y llena de magia.',
        UserId: createdUsers[0].id, // admin
        BookId: createdBooks[0].id  // Cien años de soledad
      },
      {
        rating: 4,
        comment: 'Distópico y provocador. Te hace pensar.',
        UserId: createdUsers[2].id, // user
        BookId: createdBooks[1].id  // 1984
      },
      {
        rating: 3,
        comment: 'Un clásico romántico, aunque un poco lento por momentos.',
        UserId: createdUsers[1].id, // uploader
        BookId: createdBooks[2].id  // Orgullo y prejuicio
      },
      {
        rating: 5,
        comment: 'Imprescindible para entender la historia humana.',
        UserId: createdUsers[0].id, // admin
        BookId: createdBooks[3].id  // Sapiens
      },
        {
        rating: 5,
        comment: 'excelente, sin palabras.',
        UserId: createdUsers[2].id, // admin
        BookId: createdBooks[3].id  // Sapiens
      },
      {
        rating: 4,
        comment: 'Divertido y profundo, un referente de la literatura.',
        UserId: createdUsers[2].id, // user
        BookId: createdBooks[4].id  // Don Quijote de la Mancha
      }
    ];
    await Review.bulkCreate(reviews);
    console.log('Reviews insertadas');

    console.log('Seed finalizado correctamente');
  } catch (err) {
    console.error('Error en el seed:', err);
  }
}

// Ejecución directa como script ES Modules
if (
  (import.meta.url === `file://${process.argv[1]}`) ||
  (process.argv[1] && process.argv[1].endsWith('seedDemo.mjs'))
) {
  (async () => {
    try {
      await import('../config/database.js');
      await seedDemo();
      process.exit(0);
    } catch (err) {
      console.error('Error ejecutando el seed:', err);
      process.exit(1);
    }
  })();
} else {
  console.log('El script no se está ejecutando como archivo principal.');
}
