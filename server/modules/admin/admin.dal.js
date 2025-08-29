import executeQuery from "../../config/db.js";

class AdminDal {
  //traer todos los users tipo 2
  getUsersData = async() => {
    try {
      let sql = 'SELECT user_id, user_name, lastname, email, user_is_confirmed, user_is_disabled, user_is_deleted FROM user WHERE type = 2';
      let result = await executeQuery(sql);
      return result;
    } catch (error) {
      throw { message: "Error en base de datos" };
    }
  }

  //actualizar el usuario a bloqueado desbloqueado 
  enableDisableUser = async(id, user_is_disabled) => {
    try {
      let sql = 'UPDATE user SET user_is_disabled = ? WHERE user_id = ?';
      await executeQuery(sql, [user_is_disabled, id]);
    } catch (error) {
      throw { message: "Error en base de datos" };
    }
  }

  getUserById = async(id) => {
    try {
      let sql = 'SELECT user_id, user_name, lastname, email, phone_number, avatar, specialty FROM user WHERE type = 2 AND user_id = ?';
      let result = await executeQuery(sql, [id]);
      return result;
    } catch (error) {
      throw { message: "Error en base de datos" };
    }
  }

  getAdminsData = async() => {
    try {
      let sql = 'SELECT user_id, user_name, email FROM user WHERE type = 1 AND user_is_disabled = 0';
      let result = await executeQuery(sql);
      return result;
    } catch (error) {
      throw { message: "Error en base de datos" };
    }
  }

  //consulta para comprobar que no existe el email para el registro
  findUserEmail = async(email) => {
    try {
      let sql = 'SELECT user_id FROM user WHERE email = ?';
      let result = await executeQuery(sql, [email]);
      return result;
    } catch (error) {
      throw { message: "Error en base de datos" };
    }
  }

  registerAdmin = async(data) => {
    try {
      let sql = 'INSERT INTO user (user_name, email, password, type) VALUES (?, ?, ?, ?)';
      const result = await executeQuery(sql, data);
      return result;
    } catch (error) {
      throw { message: "Error en base de datos" };
    }
  }

  removeAdmin = async(id) => {
    try {
      let sql = 'UPDATE user SET user_is_disabled = 1 WHERE user_id = ?';
      await executeQuery(sql, [id]);
    } catch (error) {
      throw { message: "Error en base de datos" };
    }
  }

  getEventsData = async() => {
    try {
      let sql = 'SELECT event_id, event_title, location, duration, start_date, end_date, number_of_attendees, price, ticket_link FROM event WHERE event_is_deleted = 0';
      const result = await executeQuery(sql);
      return result;
    } catch (error) {
      throw { message: "Error en base de datos" };
    }
  }

  //borrado lógico de evento
  deleteEvent = async(id) => {
    try {
      let sql = 'UPDATE event SET event_is_deleted = 1 WHERE event_id = ?';
      await executeQuery(sql, [id]);
    } catch (error) {
      throw { message: "Error en base de datos" };
    }
  }

  getRoomsData = async() => {
    try {
      let sql = 'SELECT * FROM room WHERE room_is_deleted = 0';
      const result = await executeQuery(sql);
      return result;
    } catch (error) {
      throw { message: "Error en base de datos" };
    }
  }

  getReservationsData = async() => {
    try {
      let sql = 'SELECT * FROM reservation';

      const result = await executeQuery(sql);
      return result;

    } catch (error) {
      throw {message: "Error en base de datos"};
    }
  }

  //borrado lógico de room
  deleteRoom = async(id) => {
    try {
      let sql = 'UPDATE room SET room_is_deleted = 1 WHERE room_id = ?';
      await executeQuery(sql, [id]);
    } catch (error) {
      throw { message: "Error en base de datos" };
    }
  }
}

export default new AdminDal();