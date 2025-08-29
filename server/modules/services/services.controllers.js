import transporter from "../../utils/nodemailer.js";
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
          <h2>Consulta de Servicios Cooperativa</h2>
          <p><strong>Nombre:</strong> ${user_name} ${lastName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Teléfono:</strong> ${phone}</p>
          <p><strong>Tipo de servicio:</strong> ${type}</p>
          <p><strong>Consulta:</strong> ${description} </p>          
            `,
        };
        const emailResult = await transporter.sendMail(mailsend);
         res.status(200).json("Mensaje Enviado") 
    } catch (error) {
         res.status(500).json({message: "server error"});
        
    }
}
    createServCoop = async (req , res) => {
  try {
    const {service_name,service_description } = req.body;

    let filename = null;
    if (req.file) {
      filename = req.file.filename;
      console.log("Archivo subido:", filename);
    }
    const result = await servicesDal.createServCoop(service_name, service_description, filename);
    res.status(200).json("Servicio Añadido");
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
}

    getDataEditServCoop = async (req , res) => {
      try {
        const {id} = req.params
        console.log(id);
        
      const result = await servicesDal.getDataEditServCoop(id);
      res.status(200).json({message: "Datos Ok" , result }) 
      } catch (error) {
      res.status(500).json({message: "server error"}); 
      }
    }

    editDataServCoop = async (req , res) =>{
     try {
    const { id } = req.params;
    const {service_name,service_description } = JSON.parse(req.body.data); 
    const data = {
                service_name,
                service_description,
                id,            
                image: req.file?req.file.filename:null
            }
    const result = await servicesDal.editDataServCoop(data);
    console.log(result);
    
    res.status(200).json("Servicio Modificado");
  } catch (error) {    
    res.status(500).json({ message: "server error" });
  }
}



    servCoopDel = async(req, res) => {
        const {service_id} = req.body;
        try {
            await servicesDal.servCoopDel(service_id);
            res.status(200).json("borrraarr")
        } catch (error) {
           console.error("Error en servCoopDel:", error);
            res.status(500).json({message:"error de server"})
        }
        
    } 


}

export default new ServiceController();