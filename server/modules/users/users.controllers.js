
import dotenv from 'dotenv';

dotenv.config();

class UserController {
    register = async(req , res) =>{
        try {
            const {user_name , email , password } = req.body;
            console.log(email);
            
            
        } catch (error) {
            console.log(error);
            
        }
    }

}

export default new UserController();