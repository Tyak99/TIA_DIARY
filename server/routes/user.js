import express from 'express';
import userController from '../controllers/UserController';

const router = express.Router();

const { login } = userController;



router.post('/login', login)

export default router;
