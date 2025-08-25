import express from 'express';
import adminControllers from './admin.controllers.js';
import { verifyToken } from '../../middlewares/verifyToken.js';
const router = express.Router();

router.get('/users', verifyToken, adminControllers.getUsersData);
router.put('/enableDisableUser', verifyToken, adminControllers.enableDisableUser);
router.get('/userProfile/:id', verifyToken, adminControllers.getUserById);

export default router;
