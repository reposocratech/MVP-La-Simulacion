import express from 'express'
import eventsControllers from './events.controllers.js'
import { verifyToken } from '../../middlewares/verifyToken.js'
import { uploadImageAny } from '../../middlewares/multerAny.js'
import { validateForm } from '../../middlewares/validateForm.js'
import { createEventSchema } from '../../schemas/eventSchema.js'
import { validateFormsEvent } from '../../middlewares/validateFormsEvent.js'
import { eventSchema2 } from '../../schemas/eventSchema2.js'
import { uploadImageSingle } from '../../middlewares/multerSingle.js'
const router = express.Router()

router.get('/events', eventsControllers.getEventData)
router.get('/calendar/month/:year/:month', eventsControllers.getEventsByMonth)
router.get('/calendar/day/:date', eventsControllers.getEventsByDay)
router.post('/createEvent', verifyToken, uploadImageAny('events'), eventsControllers.createEvent)
router.get('/event/:id', eventsControllers.getEventById)
router.get('/editEvent/:id', verifyToken, eventsControllers.getEventById);
router.put('/editData/:id', verifyToken, uploadImageSingle("events"), eventsControllers.editDataEvent);
router.put('/editSection', verifyToken, eventsControllers.editDataSection);


export default router;
