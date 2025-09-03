import express from 'express'
import eventsControllers from './events.controllers.js'
import { verifyToken } from '../../middlewares/verifyToken.js'
import { uploadImageAny } from '../../middlewares/multerAny.js'
import { createEventSchema } from '../../schemas/eventSchema.js'
import { validateFormsEvent } from '../../middlewares/validateFormsEvent.js'
import { uploadImageSingle } from '../../middlewares/multerSingle.js'
import { uploadImageMulti } from '../../middlewares/multerMultifile.js'
const router = express.Router()

router.get('/events', eventsControllers.getEventData)
router.get('/calendar/month/:year/:month', eventsControllers.getEventsByMonth)
router.get('/calendar/day/:date', eventsControllers.getEventsByDay)
router.post('/createEvent', verifyToken, uploadImageAny('events'), 
  validateFormsEvent(createEventSchema), eventsControllers.createEvent)
router.get('/event/:id', eventsControllers.getEventById)
router.get('/editEvent/:id', verifyToken, eventsControllers.getEventById);
router.put('/editData/:id', verifyToken, uploadImageSingle("events"), eventsControllers.editDataEvent);
router.put('/editSection', verifyToken, eventsControllers.editDataSection);
router.delete('/delSectionImage', verifyToken, eventsControllers.deleteSectionImage);
router.put('/addSectionImages', verifyToken, uploadImageMulti("events"), eventsControllers.addSectionImages);
router.delete('/deleteSection/:id', verifyToken, eventsControllers.deleteSection);


export default router;
