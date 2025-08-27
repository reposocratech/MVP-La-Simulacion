import executeQuery from '../../config/db.js'

class EventDal {
  //traer todos los eventos que no estén borrados
  getEventData = async () => {
    try {
      let sql =
        'SELECT event_id, event_title, event_description, location, cover_image FROM event WHERE event_is_deleted = 0'
      let result = await executeQuery(sql)
      return result
    } catch (error) {
      throw { message: 'Error en bd' }
    }
  }
  getEventsByMonth = async (year, month) => {
    try {
      const monthStr = String(month).padStart(2, '0')
      const firstDay = `${year}-${monthStr}-01`
      const sql = `SELECT event_id, event_title, event_description, location, cover_image,
                        start_date, end_date, start_hour, end_hour, price, ticket_link
                 FROM event
                 WHERE event_is_deleted = 0
                   AND ((start_date BETWEEN ? AND LAST_DAY(?))
                        OR (end_date BETWEEN ? AND LAST_DAY(?)))`
      const params = [firstDay, firstDay, firstDay, firstDay]
      const result = await executeQuery(sql, params)
      return result
    } catch (error) {
      throw { message: 'Error en bd' }
    }
  }

  getEventsByDay = async (date) => {
    try {
      const sql = `SELECT event_id, event_title, event_description, location, cover_image,
                        start_date, end_date, start_hour, end_hour, price, ticket_link
                 FROM event
                 WHERE event_is_deleted = 0
                   AND start_date <= ?
                   AND (end_date IS NULL OR end_date >= ?)`
      const params = [date, date]
      const result = await executeQuery(sql, params)
      return result
    } catch (error) {
      throw { message: 'Error en bd' }
    }
  }
}

export default new EventDal()
