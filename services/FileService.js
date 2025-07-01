// Servicio de archivos (subida)
export default function FileService() {
  function handleUpload(file) {
    if (!file) {
      throw new Error('No se subió ningún archivo.');
    }
    return {
      filename: file.filename,
      originalname: file.originalname,
      mimetype: file.mimetype,
      size: file.size,
      path: file.path
    };
  }

  return { handleUpload };
}
