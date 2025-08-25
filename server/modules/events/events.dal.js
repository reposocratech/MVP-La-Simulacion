import executeQuery from "../../config/db.js";

class EventDal {
  //traer todos los eventos que no estén borrados
  getEventData = async() => {
    try {
      let sql = 'SELECT event_id, event_title, event_description, location, cover_image FROM event WHERE event_is_deleted = 0';
      let result = await executeQuery(sql);
      return result;
    } catch (error) {
      throw { message: "Error en bd" };
    }
  }
}

export default new EventDal();