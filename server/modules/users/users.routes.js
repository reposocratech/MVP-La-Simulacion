import express from 'express';
import usersController from './users.controllers.js';

const router = express.Router();

/* GET users listing. */
router.post('/register', usersController.register);


export default router;
