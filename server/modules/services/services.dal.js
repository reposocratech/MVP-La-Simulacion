import executeQuery, { dbPool } from "../../config/db.js";

class ServiceDal {
  getDataServCoop = async () => {
    try {
      let sql = "SELECT * FROM service WHERE service_is_deleted = 0"
      let result = await executeQuery(sql)
      return result;
    } catch (error) {
      throw { message: "Error en bd" };  
    }
  }

  createServCoop = async (title, description ,filename) => {
  const connection = await dbPool.getConnection();
  try {
    const sql = "INSERT INTO service (service_name, service_description ,image) VALUES (?, ? ,?)";
    const values = [title, description , filename];
    const [result] = await connection.query(sql, values);
    return result;
  } catch (error) {
    throw { message: "Error en bd" };
  } finally {
    connection.release(); 
  }
};

  servCoopDel = async(service_id) =>{
        try {
            let sql = 'UPDATE service SET service_is_deleted = 1 WHERE service_id = ?';
          const result =  await executeQuery(sql, [service_id]);
            console.log('Resultado update:', result);
        } catch (error) {
          console.error("Error en la consulta SQL:", error);
            throw ("Error de bd")
        }
    }

}

export default new ServiceDal();