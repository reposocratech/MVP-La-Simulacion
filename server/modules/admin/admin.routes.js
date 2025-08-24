import express from 'express';
import adminControllers from './admin.controllers.js';
const router = express.Router();

router.get('/users', adminControllers.getUsersData);

export default router;
