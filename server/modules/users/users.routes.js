import express from 'express';
import usersController from './users.controllers.js';
import { verifyToken } from '../../middlewares/verifyToken.js';
import { validateForm } from '../../middlewares/validateForm.js';
import { loginSchema } from '../../schemas/loginSchema.js';
import { registerSchema } from '../../schemas/registerSchema.js';

const router = express.Router();

//Rutas Publicas
router.post('/register', validateForm(registerSchema) , usersController.register);
router.get('/verify-email', usersController.verifyEmail);
router.post('/login', validateForm(loginSchema), usersController.login);
router.get('/userById', verifyToken, usersController.userById);


export default router;
