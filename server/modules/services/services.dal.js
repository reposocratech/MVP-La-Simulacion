import executeQuery from "../../config/db.js";

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

}

export default new ServiceDal();