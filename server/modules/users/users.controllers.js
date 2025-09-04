import dotenv from 'dotenv'
import usersDal from './users.dal.js'
import { hashPassword, compareHash } from '../../helpers/hashUtils.js'
import jwt from 'jsonwebtoken'
import emailVerify from '../../utils/emailVerify.js'
import { deleteFile } from '../../helpers/fileSystem.js'
import transporter from '../../utils/nodemailer.js';
import { generateReservationEmailHTML } from '../../utils/emailReservation.js'
import { emailContact } from '../../utils/emailContact.js';

dotenv.config()
class UserController {
    register = async (req, res) => {
        try {
            const {user_name, email, password} = req.body;
            //Verificacion de que el email no este registrado
            const result = await usersDal.findUserEmail(email);
            if(result.length !== 0){
                throw {
                    isLogged: true,
                    message: "Este usuario ya existe"}
            }
            //Encriptar la contraseña
            const hashedPassword = await hashPassword(password);
            const data = [user_name, email, hashedPassword];
            await usersDal.register(data);
            //Crear token verificacion de correo
            const token = jwt.sign({email} , process.env.JWT_SECRET, {expiresIn: "1h"})
            const verificationLink = `${process.env.SERVER_URL_PUBLIC}api/users/verify-email?token=${token}`
            //Lo que se manda en el email
            const mailOptions = {
                from: `"La Simulación" <${process.env.EMAIL_USER}>`,
                //to: email,
                to: "laezne@gmail.com",
                subject: "Confirma tu cuenta",
                html: `<h2 style="
                background-color: #F0B9D9;
                display: inline-block; 
                padding: 0.5rem;
                border-radius: 10px;
                "
                >¡Hola! Este es el link para confirmar tu registro en La Simulación.</h2>
                <p>Haz clic aquí para verificar tu email:</p>
                <p>${verificationLink}</p>`,
            };
            const emailResult = await transporter.sendMail(mailOptions);
            res.status(200).json({message:"usuario creado"})
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
        //Ver si se ha recibido el token
      if (!token) {
        return res.status(400).json({ message: 'Token no proporcionado' });
      }
        //Verificacion de email y codificación
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const email = decoded.email;
      //Verificar relacion Email tokon
      if (!email) {
        return res.status(400).json({ message: 'Token inválido' });
      }
        await usersDal.verifyEmail(email);
        //Pagina de confirmacion de registro satisfactorio
        const sendConfirmation = emailVerify(`${process.env.FRONTEND_URL}login`);
        res.status(200).send(sendConfirmation)
      }
      catch (error) {
        res.status(400).send('Token inválido o expirado');
      }
    }

  login = async (req, res) => {
    try {
      const { email, password } = req.body
      // Se llama a la función findUserByEmailLogin en el Dal para buscar al usuario por email
      const result = await usersDal.findUserByEmailLogin(email)
      // Se verifica si el resultado de la consulta está vacío. Si no se encontró un usuario, se devuelve un error
      if (result.length === 0) {
        res.status(401).json({ message: 'Credenciales incorrectas' })
      } else {
        // Si el usuario existe, se compara la contraseña enviada con la contraseña hasheada en la base de datos con la funcion compareHash
        let match = await compareHash(password, result[0].password)
        if (!match) {
          res.status(401).json({ message: 'Credenciales incorrectas' })
        } else {
          // Si la contraseña es correcta se genera un token
          const token = jwt.sign(
            { user_id: result[0].user_id },
            process.env.TOKEN_KEY,
            { expiresIn: '1d' }
          )
          res.status(200).json({ token })
        }
      }
    } catch (error) {
      res.status(500).json({ message: 'server error' })
    }
  }

  userById = async (req, res) => {
    try {
      // Conseguimos el id de la solicitud
      const { simulacion_user_id } = req
      const result = await usersDal.userById(simulacion_user_id)
      if (result.length === 0) {
        res.status(401).json({ message: 'No autorizado' })
      } else {
        res.status(200).json({ user: result[0] })
      }
    } catch (error) {
      res.status(500).json({ message: 'server error' })
    }
  }

  contactEmail = async (req, res) => {
    try {
      const { name, lastname, email, phone_number, consult } = req.body;
      const html = emailContact({ name, lastname, email, phone_number, consult });
      const mailOptions = {
        from: `"Formulario contacto Web" <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_USER,
        subject: `Nuevo mensaje de contacto de ${name} ${lastname}`,
        text: `
        Nuevo mensaje de contacto
  
        Nombre: ${name} ${lastname}
        Email: ${email}
        Teléfono: ${phone_number}
        Consulta: ${consult}
        `,
        html
      }

      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: 'Correo enviado correctamente' });
    } catch (error) {
      res.status(500).json({ message: 'Error al enviar el correo' });
    }
  }

  makeRoomReservation = async (req, res) => {
    console.log("REQBODY PARA BD e EMAIL RESEV", req.body);
    try {
      // envío los datos de reserva del form a la BD:
      await usersDal.makeRoomReservation(req.body);

      //se manda un email al admin con la reserva del user:
      const emailReservationHTML = generateReservationEmailHTML(req.body);

      const mailOptions = {
        from: `"Reservas La Simulación" <${process.env.EMAIL_USER}>`,
        to: "laezne@gmail.com",
        subject: `Nueva solicitud de reserva`,
        html: emailReservationHTML
      }

      const sendingEmail = await transporter.sendMail(mailOptions);

      // res para indicar que todo fue correcto:
      res.status(200).json({ message: 'Solicitud de reserva enviada correctamente.' })

    } catch (error) {
      console.log("ERRROR CONTROLLLER RESERV", error);
      res.status(500).json({ message: 'server error' })
    }
  }

  deleteUser = async (req, res) => {
    try {
      const { id } = req.params
      const { simulacion_user_id } = req
      if (parseInt(id) !== simulacion_user_id) {
        return res
          .status(401)
          .json({ message: 'No autorizado para eliminar este usuario.' })
      }
      await usersDal.deleteUser(id)
      res.status(200).json({ message: 'Usuario eliminado correctamente' })
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Error del servidor' })
    }
  }

  editUser = async (req, res) => {
    try {
      const { simulacion_user_id } = req
      const { user_name, lastname, phone_number, specialty } = req.body
      const user = await usersDal.userById(simulacion_user_id)
      if (req.file && user[0].avatar) {
        deleteFile(user[0].avatar, 'users')
      }
      const data = {
        user_name,
        lastname,
        phone_number,
        specialty,
        user_id: simulacion_user_id,
        avatar: req.file ? req.file.filename : user[0].avatar,
      }
      await usersDal.editUser(data)
      const userEdited = await usersDal.userById(simulacion_user_id)
      res.status(200).json({ message: 'update ok', user: userEdited[0] })
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: 'server error' })
    }
  }

  changeEmail = async (req, res) => {
    try {
      const { simulacion_user_id } = req
      const { email, newEmail } = req.body
      const result = await usersDal.findUserEmail(email)
      if (result.length === 0 || result[0].user_id !== simulacion_user_id) {
        return res
          .status(401)
          .json({ message: 'El email actual no es correcto' })
      }
      const existEmail = await usersDal.findUserEmail(newEmail)
      if (existEmail.length !== 0) {
        return res.status(401).json({ message: 'El nuevo email ya existe' })
      }
      await usersDal.changeEmail(simulacion_user_id, newEmail)
      const userEdited = await usersDal.userById(simulacion_user_id)
      res
        .status(200)
        .json({
          message: 'Email actualizado correctamente',
          user: userEdited[0],
        })
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: 'server error' })
    }
  }

  changePass = async (req, res) => {
    const { simulacion_user_id } = req
    const { prevPass, newPass } = req.body
    try {
      const result = await usersDal.passwordById(simulacion_user_id)
      const match = await compareHash(prevPass, result)
      if (!match) {
        return res.status(401).json({ message: 'Contraseña actual incorrecta' })
      }
      let newHashedPass = await hashPassword(newPass)
      await usersDal.changePass(newHashedPass, simulacion_user_id)
      res.status(200).json({ message: 'Contraseña actualizada correctamente' })
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: 'server error' })
    }
  }

  editAvatar = async (req, res) => {
    try {
      const { simulacion_user_id } = req
      if (!req.file) {
        return res.status(400).json({ message: 'No se recibió ninguna imagen' })
      }
      const user = await usersDal.userById(simulacion_user_id)
      if (user[0]?.avatar) {
        deleteFile(user[0].avatar, 'users')
      }
      const avatarFileName = req.file.filename
      await usersDal.editAvatar(simulacion_user_id, avatarFileName)
      const userEdited = await usersDal.userById(simulacion_user_id)
      return res.status(200).json({
        message: 'Avatar actualizado',
        user: userEdited[0],
      })
    } catch (error) {
      console.log(error)
      return res.status(500).json({ message: 'Error del servidor' })
    }
  }
}

export default new UserController();

