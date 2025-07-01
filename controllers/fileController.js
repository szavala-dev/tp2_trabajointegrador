import FileService from '../services/FileService.js';
import { errorResponse } from '../utils/errorResponse.js';

export function makeFileController() {
  const fileService = FileService();
  return {
    async upload(req, res) {
      try {
        const fileInfo = fileService.handleUpload(req.file);
        res.status(201).json(fileInfo);
      } catch (err) {
        errorResponse(res, err, 400);
      }
    }
  };
}
