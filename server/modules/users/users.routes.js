import express from 'express';
import usersController from './users.controllers.js';
import { verifyToken } from '../../middlewares/verifyToken.js';
import { validateForm } from '../../middlewares/validateForm.js';
import { loginSchema } from '../../schemas/loginSchema.js';
import { registerSchema } from '../../schemas/registerSchema.js';
import { contactSchema } from '../../schemas/contactSchema.js';

const router = express.Router();

//Rutas Publicas
router.post('/register', validateForm(registerSchema) , usersController.register);
router.get('/verify-email', usersController.verifyEmail);
router.post('/login', validateForm(loginSchema), usersController.login);
//! userById es pública?
router.get('/userById', verifyToken, usersController.userById);
router.post('/contact', validateForm(contactSchema), usersController.contactEmail);

//Rutas privadas
router.post('/roomReservation', verifyToken, usersController.makeRoomReservation);


export default router;
