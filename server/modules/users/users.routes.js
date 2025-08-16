import express from 'express';
import usersController from './users.controllers.js';
import { verifyToken } from '../../middlewares/verifyToken.js';

const router = express.Router();

//Rutas Publicas
router.post('/register', usersController.register);
router.get('/verify-email', usersController.verifyEmail);
router.post('/login', usersController.login);
router.get('/userById', verifyToken, usersController.userById);


export default router;
