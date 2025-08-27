import express from 'express'
import eventsControllers from './events.controllers.js'
const router = express.Router()

router.get('/futures', eventsControllers.getEventData)
router.get('/calendar/month/:year/:month', eventsControllers.getEventsByMonth)
router.get('/calendar/day/:date', eventsControllers.getEventsByDay)
export default router
