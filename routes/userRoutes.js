import express from 'express';
import * as userController from '../controllers/userController.js';

const router = express.Router();

router.post('/', userController.createUser);
router.get('/', userController.getUsers);

export default router;