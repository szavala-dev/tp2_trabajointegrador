// Controlador de archivos (subida) con inyección de dependencias
export function makeFileController() {
  return {
    uploadFile(req, res) {
      if (!req.file) {
        return res.status(400).json({ error: 'No se subió ningún archivo.' });
      }
      res.status(201).json({
        filename: req.file.filename,
        originalname: req.file.originalname,
        mimetype: req.file.mimetype,
        size: req.file.size,
        path: req.file.path
      });
    }
  };
}
