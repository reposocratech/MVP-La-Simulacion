import executeQuery from "../../config/db.js";

class AdminDal {
  //traer todos los users tipo 2
  getUsersData = async() => {
    try {
      let sql = 'SELECT user_id, user_name, lastname, email, user_is_confirmed, user_is_disabled, user_is_deleted FROM user WHERE type = 2';
      let result = await executeQuery(sql);
      return result;
    } catch (error) {
      throw { message: "Error en bd" };
    }
  }
}

export default new AdminDal();