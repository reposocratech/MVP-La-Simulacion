import express from 'express'
import eventsControllers from './events.controllers.js'
import { verifyToken } from '../../middlewares/verifyToken.js'
import { uploadImageAny } from '../../middlewares/multerAny.js'
import { uploadImageFields } from '../../middlewares/multerFields.js'
const router = express.Router()

router.get('/futures', eventsControllers.getEventData)
router.get('/calendar/month/:year/:month', eventsControllers.getEventsByMonth)
router.get('/calendar/day/:date', eventsControllers.getEventsByDay)
router.post('/createEvent', verifyToken, uploadImageAny('events'), eventsControllers.createEvent)
// router.post('/createEvent', verifyToken, uploadImageFields("events"), eventsControllers.createEvent);
router.get('/event/:id', eventsControllers.getEventById)

export default router
