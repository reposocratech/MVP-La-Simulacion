import dotenv from 'dotenv';
import usersDal from './users.dal.js';
import { compareHash } from '../../helpers/hashUtils.js';
import jwt from 'jsonwebtoken';

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

    login = async(req, res) => {
        try {
            const {email, password} = req.body;
            const result = await usersDal.findUserByEmailLogin(email);
            if(result.length === 0){
                res.status(401).json({message: "Credenciales incorrectas"});
            }else{
                let match = await compareHash(password, result[0].password);
                if(!match){
                    res.status(401).json({message: "Credenciales incorrectas"});
                }else{
                    const token = jwt.sign(
                        {user_id: result[0].user_id},
                        process.env.TOKEN_KEY,
                        {expiresIn:"1d"}
                    )
                    res.status(200).json({token});
                }
            }
        } catch (error) {
            res.status(500).json({message: "server error"});
        }
    }

    userById = async(req,res) => {
        try {
            const {simulacion_user_id} = req;
            const result = await usersDal.userById(simulacion_user_id);
            if (result.length === 0){
                res.status(401).json({message: "No autorizado"})
            }else{
                res.status(200).json({user:result[0]})
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({message: "server error"});
        }
    }
}

export default new UserController();