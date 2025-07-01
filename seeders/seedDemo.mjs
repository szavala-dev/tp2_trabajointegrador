import bcrypt from 'bcryptjs';
import { User, Genre, Book } from '../models/index.js';

export async function seedDemo() {
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
  await User.bulkCreate(users);

  // Géneros de ejemplo
  const genres = [
    { name: 'Ficción' },
    { name: 'No Ficción' },
    { name: 'Ciencia' },
    { name: 'Historia' }
  ];
  await Genre.bulkCreate(genres);

  // Libros de ejemplo
  const books = [
    {
      title: 'El Principito',
      author: 'Antoine de Saint-Exupéry',
      GenreId: 1,
      UserId: 2
    },
    {
      title: 'Breve historia del tiempo',
      author: 'Stephen Hawking',
      GenreId: 3,
      UserId: 2
    }
  ];
  await Book.bulkCreate(books);
}

// Para ejecutar desde CLI en ES Modules
if (import.meta.url === `file://${process.argv[1]}`) {
  const db = await import('../config/database.js');
  await seedDemo();
  console.log('Datos de ejemplo insertados con Model.bulkCreate');
  process.exit(0);
}
