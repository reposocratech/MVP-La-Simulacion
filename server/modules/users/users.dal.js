import executeQuery from "../../config/db.js";

class UserDal {

  // Método para encontrar un usuario a partir de su email
  findUserByEmailLogin = async(email) => {

    try {
      let sql = 'SELECT user_id, password FROM user WHERE email = ? AND user_is_deleted = 0 AND user_is_confirmed = 1 AND user_is_disabled = 0';
      let result = await executeQuery(sql, [email]);
      return result;

    } catch (error) {
      throw {message: "Error en bd"};
    }
  };

  // Método para obtener toda la info de un usuario a partir de su id
  userById = async(id) => {

    try {
      let sql = "SELECT * FROM user WHERE user_id = ? AND user_is_deleted = 0 AND user_is_disabled = 0 AND user_is_confirmed = 1";
      const result = executeQuery(sql, [id]);
      return result;

    } catch (error) {
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

  editUser = async (data) => {
    try {
      const { user_name, lastname, phone_number, specialty, user_id, avatar } = data;
      let sql = 'UPDATE user SET user_name = ?, lastname = ?, phone_number = ?, specialty = ? WHERE user_id = ?';
      let values = [user_name, lastname, phone_number, specialty, user_id];
      if (avatar) {
        sql = 'UPDATE user SET user_name = ?, lastname = ?, phone_number = ?, specialty = ?, avatar = ? WHERE user_id = ?';
        values = [user_name, lastname, phone_number, specialty, avatar, user_id];
      }
      await executeQuery(sql, values);

    } catch (error) {
      throw { message: "Error en bd" };
    }
  };

  changeEmail = async (user_id, newEmail) => {
    try {
      const sql = 'UPDATE user SET email = ? WHERE user_id = ?';
      await executeQuery(sql, [newEmail, user_id]);

    } catch (error) {
      throw { message: "Error en bd" };
    }
  };

  passwordById = async (user_id) => {
    try {
      let sql = 'SELECT password FROM user WHERE user_id = ? AND user_is_deleted = 0';
      let result = await executeQuery(sql, [user_id]);
      return result[0].password;

    } catch (error) {
      throw { message: "Error en db" };
    }
  };

  changePass = async (newPass, user_id) => {
    try {
      const sql = "UPDATE user SET password = ? WHERE user_id = ?";
      const values = [newPass, user_id];
      await executeQuery(sql, values);

    } catch (error) {
      throw { message: "Error en db" };
    }
  };

   deleteUser = async (id) => {
    try {
      const sql = "UPDATE user SET user_is_deleted = 1 WHERE user_id = ?";
      await executeQuery(sql, [id]);
    } catch (error) {
      throw { message: "Error en bd" };
    }
  };

   editAvatar = async(user_id, avatar) => {
        try {
            const sql = 'UPDATE user SET avatar = ? WHERE user_id = ?';
            const values = [avatar, user_id];
            await executeQuery(sql, values);
        } catch (error) {
            throw { message: "Error en bd" };
        }
    };

    makeRoomReservation = async(data) => {
      try {
        const {user_id, room_id} = data;
        const {phone_number, date, start_hour, end_hour, proyect_description, proyect_type, socialmedia_link, ilumination_material, number_of_attendees, aditional_requirement, user_policy_confirmation} = data.reservationData;

        let sql = 'INSERT INTO reservation (user_id, room_id, phone_number, date, start_hour, end_hour, proyect_description, proyect_type, socialmedia_link, ilumination_material, number_of_attendees, aditional_requirement, user_policy_confirmation) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)';

        let values = [user_id, room_id, phone_number, date, start_hour, end_hour, proyect_description, proyect_type, socialmedia_link, ilumination_material, number_of_attendees, aditional_requirement, user_policy_confirmation];

        await executeQuery(sql, values);

      } catch (error) {
        throw {message: "Error en BD"};
      }



    }

}

export default new UserDal();
