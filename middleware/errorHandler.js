export function errorHandler(err, req, res, next) {
  if (err.name === 'SequelizeValidationError') {
    return res.status(400).json({ errors: err.errors.map(e => ({ message: e.message, field: e.path })) });
  }
  if (err.name === 'SequelizeUniqueConstraintError') {
    return res.status(400).json({ error: 'Ya existe un registro con ese valor único.' });
  }
  if (err.status && err.message) {
    return res.status(err.status).json({ error: err.message });
  }
  res.status(500).json({ error: err.message || 'Error interno del servidor' });
}