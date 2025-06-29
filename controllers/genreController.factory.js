// Controlador de géneros con inyección de dependencias
export function makeGenreController({ Genre }) {
  return {
    async createGenre(req, res, next) {
      try {
        const { name } = req.body;
        const genre = await Genre.create({ name });
        res.status(201).json(genre);
      } catch (error) {
        next(error);
      }
    },
    async getGenres(req, res, next) {
      try {
        const genres = await Genre.findAll();
        res.json(genres);
      } catch (error) {
        next(error);
      }
    },
    async updateGenre(req, res, next) {
      try {
        const { id } = req.params;
        const { name } = req.body;
        const genre = await Genre.findByPk(id);
        if (!genre) return res.status(404).json({ error: "Género no encontrado" });
        genre.name = name;
        await genre.save();
        res.json(genre);
      } catch (error) {
        next(error);
      }
    },
    async deleteGenre(req, res, next) {
      try {
        const { id } = req.params;
        const genre = await Genre.findByPk(id);
        if (!genre) return res.status(404).json({ error: "Género no encontrado" });
        await genre.destroy();
        res.json({ message: "Género eliminado" });
      } catch (error) {
        next(error);
      }
    }
  };
}
