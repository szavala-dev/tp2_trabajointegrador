import express from 'express';
import * as userController from '../controllers/UserController.js';

const router = express.Router();

router.post('/', userController.createUser);
router.get('/', userController.getUsers);

export default router;