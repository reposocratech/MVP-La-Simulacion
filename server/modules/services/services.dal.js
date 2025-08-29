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

  createServCoop = async (service_name, service_description ,filename) => {
  try {
    let sql = "INSERT INTO service (service_name, service_description ) VALUES (?, ?)";
    let values = [service_name, service_description ];
    if(filename){
     sql = "INSERT INTO service (service_name, service_description ,image) VALUES (?, ? ,?)"  
     values = [service_name, service_description , filename]
    }
    await executeQuery(sql, values);
  } catch (error) {
    throw { message: "Error en bd" };
  }   
};

  getDataEditServCoop = async (id) => {
      try {
        let sql = "SELECT * FROM service WHERE service_id = ? "
        let result = await executeQuery(sql , [id])
        return result;
      } catch (error) {
        throw { message: "Error en bd" };  
      }
    }

  editDataServCoop = async (data) => {
    try {
    const {service_name , service_description , image , id} = data

    let sql = "UPDATE service SET service_name = ? , service_description = ?   WHERE service_id = ?  "
    let values = [service_name , service_description , id]
    if(image){
     sql = "UPDATE service SET service_name = ? , service_description = ? , image = ?  WHERE service_id = ?  "  
     values = [service_name , service_description ,image , id]
    }
    await executeQuery(sql, values);
    } catch (error) {
      throw {message: "Error bd"}
    }
  }
  



  servCoopDel = async(service_id) =>{
        try {
            let sql = 'UPDATE service SET service_is_deleted = 1 WHERE service_id = ?';
          const result =  await executeQuery(sql, [service_id]);
        } catch (error) {
          console.error("Error bd ", error);
            throw ("Error de bd")
        }
    }

}

export default new ServiceDal();