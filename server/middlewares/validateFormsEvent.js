import { ZodError } from "zod";

export const validateFormsEvent = (schema) => (req, res, next)=> {

  try {
  
   // condición para ver si el req.body.dataTotal trae datos. 
   if (req.body.dataTotal) {

      try {
        //si trae datos lo convertimos en un objeto
        req.body = JSON.parse(req.body.dataTotal);

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

