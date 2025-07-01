import GenreService from '../services/GenreService.js';
import { errorResponse } from '../utils/errorResponse.js';

export function makeGenreController({ Genre }) {
  const genreService = GenreService({ Genre });
  return {
    async create(req, res) {
      try {
        const { name } = req.body;
        const result = await genreService.createGenre({ name });
        res.status(201).json(result);
      } catch (err) {
        errorResponse(res, err, 400);
      }
    },
    async getAll(req, res) {
      try {
        const genres = await genreService.getGenres();
        res.json(genres);
      } catch (err) {
        errorResponse(res, err, 400);
      }
    },
    async update(req, res) {
      try {
        const { id } = req.params;
        const { name } = req.body;
        const result = await genreService.updateGenre(id, { name });
        res.json(result);
      } catch (err) {
        errorResponse(res, err, 400);
      }
    },
    async delete(req, res) {
      try {
        const { id } = req.params;
        const result = await genreService.deleteGenre(id);
        res.json(result);
      } catch (err) {
        errorResponse(res, err, 400);
      }
    }
  };
}
