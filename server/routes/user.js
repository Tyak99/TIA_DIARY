import express from 'express';
import userController from '../controllers/UserController';

const router = express.Router();

router.post('/signup', userController.createUser);

const { login } = userController;



router.post('/login', login)

export default router;
