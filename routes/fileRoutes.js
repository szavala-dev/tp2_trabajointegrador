import express from 'express';
import { upload } from '../middleware/multer.js';
import { body, validationResult } from 'express-validator';

export default function createFileRoutes({ fileController }) {
  const router = express.Router();
  // Ruta para subir un archivo (ejemplo: portada o libro)
  router.post(
    '/upload',
    upload.single('file'),
    // Validación de tipo y tamaño de archivo
    (req, res, next) => {
      if (!req.file) {
        return res.status(400).json({ error: 'Archivo requerido' });
      }
      // Ejemplo: solo PDF y máx 5MB
      if (req.file.mimetype !== 'application/pdf') {
        return res.status(400).json({ error: 'Solo se permiten archivos PDF' });
      }
      if (req.file.size > 5 * 1024 * 1024) {
        return res.status(400).json({ error: 'El archivo excede el tamaño máximo (5MB)' });
      }
      next();
    },
    fileController.upload
  );
  return router;
}
