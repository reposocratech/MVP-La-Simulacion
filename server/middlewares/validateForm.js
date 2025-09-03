import { ZodError } from "zod";

export const validateForm = (schema) => (req, res, next)=> {

  try {
     console.log("Datos recibidos para validacion:", req.body)
  console.log("CONSOLE LOG VALIDATE", req.body.data)
   // condición para ver si el req.body trae data.
   if (req.body.data) {

      try {
        //si trae data lo convertimos en un objeto
        req.body = JSON.parse(req.body.data);

      } catch (e) {
        return res.status(400).json({
          error: [{
            path: "data",
            message: "El formato de los datos no es válido. Se espera un JSON válido."
          }]
        });
      }

    }
    //validamos con Zod
    schema.parse(req.body);
    next();

  } catch (error) {

    if(error instanceof ZodError){
      return res.status(400).json({
        error: error.issues.map((er)=>({
          path: er.path[0],
          message: er.message
        }))
      });
    }else{
      res.status(500).json({message: "Ups, algo salió mal"});
    }
  }
}

