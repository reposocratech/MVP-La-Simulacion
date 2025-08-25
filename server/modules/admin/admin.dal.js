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
}

export default new AdminDal();