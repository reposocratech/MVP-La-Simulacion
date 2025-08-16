import dotenv from 'dotenv';
import usersDal from './users.dal.js';
import { hashPassword , compareHash } from '../../helpers/hashUtils.js';
import jwt from 'jsonwebtoken';
import sendConfirmationMail from '../../utils/nodemailer.js';
import { registerSchema } from '../../schemas/registerSchema.js';
import { ZodError } from "zod"

dotenv.config();

class UserController {
    register = async (req, res) => {
        try {
           
            const {user_name, email, password} = req.body;
            
            const result = await usersDal.findUserEmail(email);
            console.log("ressuullt", result);
            
            if(result.length !== 0){
                throw {
                    isLogged: true,
                    message: "usuario ya existe"}
            }

            
            const hashedPassword = await hashPassword(password);

            const data = [user_name, email, hashedPassword];
            await usersDal.register(data);

            const token = jwt.sign({email} , process.env.JWT_SECRET, {expiresIn: "1h"})
            const verificationLink = `${process.env.SERVER_URL_PUBLIC}api/users/verify-email?token=${token}`
            console.log("direccionnnnnnnnnnn" ,process.env.SERVER_URL_PUBLIC);
            const mailOptions = {
            from: `"travels" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "Confirma tu cuenta",
            html: `<h2>Link para confirmar registro</h2><p>${verificationLink}</p>`,
             };
             const emailResult = await sendConfirmationMail.sendMail(mailOptions);
            console.log("Resultado envío email:", emailResult);
            

            res.status(200).json("usuario creado") 
             } catch (error) {
                
            if(error.isLogged){
                res.status(401).json(error.message);
            }else{
              
                res.status(500).json(error.message);
            }
        }
    }
   
    verifyEmail = async (req, res) => {
  try {
    const { token } = req.query;

    if (!token) {
      return res.status(400).json({ message: 'Token no proporcionado' });
    }

    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const email = decoded.email;

    if (!email) {
      return res.status(400).json({ message: 'Token inválido' });
    }

    
    await usersDal.verifyEmail(email); 

   res.status(200).send(`
  <html>
    <head>
      <meta charset="UTF-8">
      <title>Email verificado</title>
    </head>
    <body>
      <h2>Email verificado correctamente. Redirigiendo al login...</h2>
      <script>
        setTimeout(function() {
          window.location.href = "${process.env.FRONTEND_URL}login";
        }, 3000); 
      </script>
    </body>
  </html>
`);
  } catch (error) {
    console.error('Error verificando email:', error);
    res.status(400).send('Token inválido o expirado');
  }
};

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
            res.status(500).json({message: "server error"});
        }
    }
}

export default new UserController();