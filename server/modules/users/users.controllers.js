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
            const mailOptions = {
            from: `"La Simulación" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "Confirma tu cuenta",
            html: `<h2>Link para confirmar registro</h2><p>${verificationLink}</p>`,
             };
             const emailResult = await sendConfirmationMail.sendMail(mailOptions);
            
            res.status(200).json("usuario creado") 
             } catch (error) {
                
            if(error.isLogged){
                res.status(401).json(error.message);
            }else{
              
                res.status(500).json({message: "server error"});
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
    res.status(400).send('Token inválido o expirado');
  }
};

  login = async(req, res) => {

    try {
      const {email, password} = req.body;
      // Se llama a la función findUserByEmailLogin en el Dal para buscar al usuario por email
      const result = await usersDal.findUserByEmailLogin(email);

      // Se verifica si el resultado de la consulta está vacío. Si no se encontró un usuario, se devuelve un error
      if(result.length === 0){
          res.status(401).json({message: "Credenciales incorrectas"});

      }else{
          // Si el usuario existe, se compara la contraseña enviada con la contraseña hasheada en la base de datos con la funcion compareHash
          let match = await compareHash(password, result[0].password);

          if(!match){
              res.status(401).json({message: "Credenciales incorrectas"});
              
          }else{
              // Si la contraseña es correcta se genera un token
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
            // Conseguimos el id de la solicitud
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

  contactEmail = async(req, res) => {
    try {
      const { name, lastname, email, phone_number, consult } = req.body;

      const mailOptions = {
        from: `"Formulario contacto Web" <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_USER, 
        subject: `Nuevo mensaje de contacto de ${name} ${lastname}`,
        html: `
          <h2>Nuevo mensaje de contacto</h2>
          <p><strong>Nombre:</strong> ${name} ${lastname}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Teléfono:</strong> ${phone_number}</p>
          <p><strong>Consulta:</strong> ${consult}</p>
        `
      };

      const info = await sendConfirmationMail.sendMail(mailOptions);
      console.log("mensaje enviado", info.messageId);
      res.status(200).json({ message: 'Correo enviado correctamente' });
    } catch (error) {
      res.status(500).json({ message: 'Error al enviar el correo' });
    }
  }
}

export default new UserController();