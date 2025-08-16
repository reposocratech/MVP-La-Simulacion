import express from 'express';
import usersController from './users.controllers.js';
import { verifyToken } from '../../middlewares/verifyToken.js';

const router = express.Router();

/* GET users listing. */
router.post('/register', usersController.register);

router.post('/login', usersController.login);

router.get('/userById', verifyToken, usersController.userById);


export default router;
