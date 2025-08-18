import executeQuery from "../../config/db.js";

class UserDal {

  findUserByEmailLogin = async(email) => {
    try {
      let sql = 'SELECT user_id, password FROM user WHERE email = ? AND user_is_deleted = 0 AND user_is_confirmed = 1 AND user_is_disabled = 0';
      let result = await executeQuery(sql, [email]);
      return result;
    } catch (error) {
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

findUserEmail = async (email) =>{
    try {
    let sql = "SELECT user_id FROM user WHERE email = ?"
    let result = await executeQuery(sql , [email])   
    return result;
    } catch (error) {
    throw{message: "Error en bd"}  
    }
}    


register = async (data)=>{
    try {
       let sql = "INSERT INTO user (user_name , email , password) VALUES (?,?,?) " 
       await executeQuery(sql, data)
    } catch (error) {
        throw{message: "Error en bd "}
        
    }
}
verifyEmail = async (email) => {
    try {
        const sql = "UPDATE user SET user_is_confirmed = 1 WHERE email = ?";
        await executeQuery(sql, [email]);
    } catch (error) {
        throw { message: "Error en bd" };
    }
}
}

export default new UserDal();