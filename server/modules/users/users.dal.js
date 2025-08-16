import executeQuery from "../../config/db.js";

class UserDal {

  findUserByEmailLogin = async(email) => {
    console.log("EMAAAAIIIL", email);
    try {
      let sql = 'SELECT user_id, password FROM user WHERE email = ? AND user_is_deleted = 0 AND user_is_confirmed = 1 AND user_is_disabled = 0';
      let result = await executeQuery(sql, [email]);
      return result;
    } catch (error) {
      console.log("1111111111111111111111111", error);
      throw {message: "Error en bd"};
    }
  };

  userById = async(id) => {
    try {
      let sql = "SELECT * FROM user WHERE user_id = ? AND user_is_deleted = 0 AND user_is_disabled = 0 AND user_is_confirmed = 1";
      const result = executeQuery(sql, [id]);
      return result;
    } catch (error) {
      console.log(error);
      throw {message: "Error en bd"};
    }
  }

}

export default new UserDal();