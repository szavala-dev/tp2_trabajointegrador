// utils/errorResponse.js
export function errorResponse(res, err, fallbackCode = 400) {
  if (err.name === 'SequelizeValidationError') {
    return res.status(400).json({ error: { code: 400, message: err.message } });
  }
  if (err.message === 'No encontrado') {
    return res.status(404).json({ error: { code: 404, message: err.message } });
  }
  if (err.message === 'No autorizado') {
    return res.status(401).json({ error: { code: 401, message: err.message } });
  }
  if (err.message === 'Prohibido') {
    return res.status(403).json({ error: { code: 403, message: err.message } });
  }
  return res.status(fallbackCode).json({ error: { code: fallbackCode, message: err.message } });
}
