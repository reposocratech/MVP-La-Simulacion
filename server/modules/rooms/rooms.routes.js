import express from 'express';
import roomsControllers from './rooms.controllers.js';
import { verifyToken } from '../../middlewares/verifyToken.js';
import { uploadImageMulti } from '../../middlewares/multerMultifile.js';

const router = express.Router();

router.post('/createRoom', verifyToken, uploadImageMulti("rooms"), roomsControllers.createRoom);
router.get('/room:id', roomsControllers.showOneRoom);

export default router;
