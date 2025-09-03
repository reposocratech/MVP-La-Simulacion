import executeQuery, { dbPool } from "../../config/db.js";
import { deleteFile } from "../../helpers/fileSystem.js";

class RoomDal {
  createRoom = async(data)=>{
    const {room_name, room_description, who_can_use_it, pricing, usage_policy} = data;

    // Creamos la conexión con la Pool
    const connection = await dbPool.getConnection();

    try {
      //Empezamos la transacción
      await connection.beginTransaction();

      let sql = 'INSERT INTO room (room_name, room_description,who_can_use_it, pricing, usage_policy) VALUES (?,?,?,?,?) ';
      let values = [room_name, room_description, who_can_use_it, pricing, usage_policy];
      let result = await connection.query(sql, values);

      // Obtenemos el id de la sala recien creada
      let room_id = result[0].insertId;

      // Iteramos sobre los archivos de imágenes para insertarlos en la tabla `room_image`.
      let file_id_initial=0;
      data.file.forEach(async(file) => {
        file_id_initial++;
        let sqlFile = 'INSERT INTO room_image (room_id, room_image_id, file) VALUES (?,?,?)';
        let valuesFile = [room_id, file_id_initial, file];
        await connection.query(sqlFile, valuesFile);
      });
      
      // Confirmamos la transacción
      await connection.commit();
      // Como me hará falta el id de la sala para poder navegar a ella en cuanto puse el botón, como aquí anteriormente ya lo había rescatado, se lo mando al controlador para que a su vez de lo mande al componente
      return room_id;

    } catch (error) {
      // Si hay error, se revierte la transacción
      await connection.rollback();
      throw error;

    }finally {
      // Liberamos la conexión
      connection.release();
    }
  }

  getRoomById = async(id)=> {
    try {
      let sql = "SELECT * FROM room WHERE room_id = ?"
      const result = await executeQuery(sql, [id]);
      return result;

    } catch (error) {
      console.log("Error RoomByIdDal", error);
      throw error;
    }
  }

  getRoomImagesById = async(id) => {
    try {
      let sql = "SELECT * FROM room_image WHERE room_id = ?";
      const result = await executeQuery(sql, [id]);
      return result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  editRoom = async(data)=>{
    const {room_id, room_name, room_description, who_can_use_it, pricing, usage_policy} = data;
    
    try {
      let sql = 'UPDATE room SET room_name = ?, room_description = ?, who_can_use_it = ?, pricing = ?, usage_policy = ? WHERE room_id =?';
      let values = [room_name, room_description, who_can_use_it, pricing, usage_policy, room_id];
      let result = await executeQuery(sql, values);
      
    } catch (error) {
      throw error;
    }
  }

  imagesByRoomId = async(id)=>{
    try {
      let sql = "SELECT * FROM room_image WHERE room_id = ?";
      const result = await executeQuery(sql,[id]);
      return result;

    } catch (error) {
      throw error;
    }
  }

  deleteImg = async (room_id, room_image_id, file) =>{
    try {
      let sql = 'DELETE FROM room_image WHERE room_id = ? AND room_image_id = ?';
      await executeQuery(sql, [room_id, room_image_id]);
      // Llama a la función deleteFile para eliminar el archivo del server
      await deleteFile(file, "rooms");

    } catch (error) {
      throw error;
    }
  }

  addImages = async(room_id, imgs)=>{
    const connection = await dbPool.getConnection();
    try {
      await connection.beginTransaction();
        // Obtengo el id más alto ya que no tengo autoincrement
        let sqlId = "SELECT IFNULL(MAX(room_image_id), 0) AS max_id FROM room_image WHERE room_id = ?";
        let [result] = await connection.query(sqlId, [room_id]);
        let maxId = result[0].max_id;
      
        imgs.forEach(async(elem)=>{
          // Por cada imagen incremento el id
          maxId++;
          let sqlImg = 'INSERT INTO room_image (room_id, room_image_id, file) VALUES (?,?,?)'
          let values = [room_id, maxId, elem.filename]
          await connection.query(sqlImg, values);    
        })
        
      await connection.commit();
      return { success: true, message: "Imágenes añadidas correctamente." };

    } catch (error) {
      await connection.rollback();
      throw error;

    } finally {
      connection.release();
    }
  }

  getRoomsData = async() => {
    try {
      let sql = "SELECT room.room_id, room.room_name, room.room_description, room.who_can_use_it, room.pricing, room.usage_policy, (SELECT file FROM room_image WHERE room_image.room_id = room.room_id ORDER BY room_image_id LIMIT 1) as first_image FROM room WHERE room.room_is_deleted = 0";
      let result = await executeQuery(sql);
      return result;
    } catch (error) {
      throw error;
    }
  }

}

export default new RoomDal();