import executeQuery from "../../config/db.js";



class UserDal {

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