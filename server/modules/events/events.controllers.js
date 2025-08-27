import eventsDal from './events.dal.js'

class EventController {
  getEventData = async (req, res) => {
    try {
      const result = await eventsDal.getEventData()
      res.status(200).json(result)
    } catch (error) {
      res.status(500).json({ message: 'Error de servidor' })
    }
  }

  // Obtener eventos de un mes concreto
  getEventsByMonth = async (req, res) => {
    try {
      const { year, month } = req.params
      const result = await eventsDal.getEventsByMonth(
        Number(year),
        Number(month)
      )
      res.status(200).json(result)
    } catch (error) {
      res.status(500).json({ message: 'Error de servidor' })
    }
  }

  // Obtener eventos de un día concreto
  getEventsByDay = async (req, res) => {
    try {
      const { date } = req.params
      const result = await eventsDal.getEventsByDay(date)
      res.status(200).json(result)
    } catch (error) {
      res.status(500).json({ message: 'Error de servidor' })
    }
  }
}

export default new EventController()
