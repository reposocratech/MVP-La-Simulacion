import executeQuery, { dbPool } from "../../config/db.js";

class RoomDal {
  createRoom = async(data)=>{
    const {room_name, room_description, who_can_use_it, pricing, usage_policy} = data;
    const connection = await dbPool.getConnection();
    try {
      await connection.beginTransaction();

      let sql = 'INSERT INTO room (room_name, room_description,who_can_use_it, pricing, usage_policy) VALUES (?,?,?,?,?) ';
      let values = [room_name, room_description, who_can_use_it, pricing, usage_policy];
      let result = await connection.query(sql, values);
      let room_id = result[0].insertId;


      let file_id_initial=0;
      data.file.forEach(async(file) => {
        file_id_initial++;
        let sqlFile = 'INSERT INTO room_img (room_id, room_image_id, file) VALUES (?,?,?)';
        let valuesFile = [room_id, file_id_initial, file];
        await connection.query(sqlFile, valuesFile);
      });
      
      await connection.commit();

    } catch (error) {
      await connection.rollback();
      console.log(error);
      throw error;
      
      
    }finally {
      connection.release();
    }
  }

  getRoomById = async(id)=> {
    try {
      let sql = "SELECT * FROM room WHERE room_id = ?"
      const result = executeQuery(sql, [id]);
      return result;

    } catch (error) {
      console.log("Error RoomByIdDal", error);
      throw error;
    }
  }


}

export default new RoomDal();