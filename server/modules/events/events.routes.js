import express from 'express';
import eventsControllers from './events.controllers.js';
const router = express.Router();

router.get('/futures', eventsControllers.getEventData);

export default router;
