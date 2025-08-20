import sendConfirmationMail from "../../utils/nodemailer.js";
import servicesDal from "./services.dal.js";

class ServiceController {

getDataServCoop = async (req , res) => {
  try {
  const result = await servicesDal.getDataServCoop();
  res.status(200).json({message: "Datos Ok" , result }) 
  } catch (error) {
  res.status(500).json({message: "server error"}); 
  }
}

sendMailServCoop = async (req , res)=>{
    try {
        
        const {user_name , lastName , email , phone , type , description} = req.body
    
        const mailsend = {
         from: `"Servicios Cooperativa" <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_USER,
        subject: "Consulta Servicios Cooperativa",
        text: `
          Nombre: ${user_name} ${lastName}
          Email: ${email}
          Teléfono: ${phone}
          Tipo de servicio: ${type}
          Consulta:
          ${description}
            `,
        };
        const emailResult = await sendConfirmationMail.sendMail(mailsend);
         res.status(200).json("Mensaje Enviado") 
    } catch (error) {
         res.status(500).json({message: "server error"});
        
    }
}

}

export default new ServiceController();