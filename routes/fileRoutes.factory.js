import express from 'express';
import { upload } from '../middleware/multer.js';

export default function createFileRoutes({ fileController }) {
  const router = express.Router();
  // Ruta para subir un archivo (ejemplo: portada o libro)
  router.post('/upload', upload.single('file'), fileController.uploadFile);
  return router;
}
