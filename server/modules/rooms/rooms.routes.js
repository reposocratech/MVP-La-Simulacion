import express from 'express';
import roomsControllers from './rooms.controllers.js';
import { verifyToken } from '../../middlewares/verifyToken.js';
import { uploadImageMulti } from '../../middlewares/multerMultifile.js';
import { validateForm } from '../../middlewares/validateForm.js';
import {createRoomSchema } from '../../schemas/createRoomSchema.js'

const router = express.Router();

router.post('/createRoom', verifyToken, uploadImageMulti("rooms"), validateForm(createRoomSchema), roomsControllers.createRoom);
router.get('/room/:id', roomsControllers.getRoomWithImagesById);
router.put('/editRoom/:id', verifyToken, uploadImageMulti("rooms"), roomsControllers.editRoom);

export default router;
