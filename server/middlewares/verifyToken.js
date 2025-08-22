import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const verifyToken = (req, res, next)=> {

  const tokenBearer = req.headers.authorization;

  if(!tokenBearer){
    res.status(401).json({message: "No autorizado"});

  }else{
    let cleanToken = tokenBearer.split(" ")[1];

    try {
      let result = jwt.verify(cleanToken, process.env.TOKEN_KEY);
      req.simulacion_user_id = result.user_id;
      next();
      
    } catch (error) {
      res.status(401).json({message: "No autorizado"});
    }
  }
}