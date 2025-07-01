// Servicio de géneros
export default function GenreService({ Genre }) {
  async function createGenre({ name }) {
    return await Genre.create({ name });
  }

  async function getGenres() {
    return await Genre.findAll();
  }

  async function updateGenre(id, { name }) {
    const genre = await Genre.findByPk(id);
    if (!genre) throw new Error('Género no encontrado');
    genre.name = name;
    await genre.save();
    return genre;
  }

  async function deleteGenre(id) {
    const genre = await Genre.findByPk(id);
    if (!genre) throw new Error('Género no encontrado');
    await genre.destroy();
    return { message: 'Género eliminado' };
  }

  return { createGenre, getGenres, updateGenre, deleteGenre };
}
