import express from 'express';
import usersController from './users.controllers.js';
import { verifyToken } from '../../middlewares/verifyToken.js';
import { validateForm } from '../../middlewares/validateForm.js';
import { loginSchema } from '../../schemas/loginSchema.js';
import { registerSchema } from '../../schemas/registerSchema.js';
import { contactSchema } from '../../schemas/contactSchema.js';
import { uploadImageSingle } from '../../middlewares/multerSingle.js';
import { reservationSchema } from '../../schemas/reservationSchema.js';
import { changeEmailSchema } from '../../schemas/changeEmailSchema.js';
import { editProfileSchema } from '../../schemas/editProfileSchema.js';
import {changePasswordSchema} from '../../schemas/changePasswordSchema.js'

const router = express.Router();

//Rutas Publicas
router.post('/register', validateForm(registerSchema) , usersController.register);
router.get('/verify-email', usersController.verifyEmail);
router.post('/login', validateForm(loginSchema), usersController.login);
router.post('/contact', validateForm(contactSchema), usersController.contactEmail);

//Rutas Privadas
router.get('/userById', verifyToken, usersController.userById);
router.put('/editUser', verifyToken, validateForm(editProfileSchema),  usersController.editUser);
router.put('/changeEmail', verifyToken, validateForm(changeEmailSchema), usersController.changeEmail);
router.put('/changePass', verifyToken, validateForm(changePasswordSchema), usersController.changePass);
router.delete("/deleteUser/:id", verifyToken, usersController.deleteUser);
router.put("/editAvatar", verifyToken, uploadImageSingle("users"), usersController.editAvatar);
router.post('/roomReservation/:id/:room_name', verifyToken, validateForm(reservationSchema), usersController.makeRoomReservation);


export default router;
