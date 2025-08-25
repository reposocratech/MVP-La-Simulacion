import express from 'express';
import usersController from './users.controllers.js';
import { verifyToken } from '../../middlewares/verifyToken.js';
import { validateForm } from '../../middlewares/validateForm.js';
import { loginSchema } from '../../schemas/loginSchema.js';
import { registerSchema } from '../../schemas/registerSchema.js';
import { contactSchema } from '../../schemas/contactSchema.js';
import { uploadImageSingle } from '../../middlewares/multerSingle.js';

const router = express.Router();

//Rutas Publicas
router.post('/register', validateForm(registerSchema) , usersController.register);
router.get('/verify-email', usersController.verifyEmail);
router.post('/login', validateForm(loginSchema), usersController.login);
router.post('/contact', validateForm(contactSchema), usersController.contactEmail);


//Rutas Privadas
router.get('/userById', verifyToken, usersController.userById);
router.put('/editUser', verifyToken,  usersController.editUser);
router.put('/changeEmail', verifyToken, usersController.changeEmail);
router.put('/changePass', verifyToken, usersController.changePass);
router.delete("/deleteUser/:id", verifyToken, usersController.deleteUser);
router.put("/editAvatar", verifyToken, uploadImageSingle("users"), usersController.editAvatar);


export default router;
