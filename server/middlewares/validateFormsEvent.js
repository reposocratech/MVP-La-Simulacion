import { ZodError } from "zod";

export const validateFormsEvent = (schema) => (req, res, next) => {
  console.log("🟢 validateFormsEvent | RAW body:", req.body);
  console.log("🟢 validateFormsEvent | dataToValidate antes de parsear:", 
            req.body.dataTotal || req.body.data || req.body);
  // Inicializamos un objeto para los datos que vamos a validar.
  let dataToValidate = {};

  try {
    // 1. Manejar el caso donde multer envía los datos como req.body.dataTotal
    if (req.body.dataTotal) {
      // Si es una cadena, intentamos parsearla
      if (typeof req.body.dataTotal === "string") {
        dataToValidate = JSON.parse(req.body.dataTotal);
      } else {
        // Si ya es un objeto, lo usamos directamente
        dataToValidate = req.body.dataTotal;
      }
    }
    // 2. Manejar el caso donde los datos vienen en req.body.data (por ejemplo desde tu front)
    else if (req.body.data) {
      if (typeof req.body.data === "string") {
        dataToValidate = JSON.parse(req.body.data);
      } else {
        dataToValidate = req.body.data;
      }
    }
    // 3. Manejar el caso donde los datos se envían directamente en req.body (sin Multer ni "data")
    else {
      dataToValidate = req.body;
    }

    // 4. Desenrollar la sección si existe para que Zod valide un objeto plano
    if (dataToValidate.section) {
      dataToValidate = {
        ...dataToValidate.section,
        ...("event_id" in dataToValidate ? { event_id: dataToValidate.event_id } : {})
      };
    }

    // Validación Zod con los datos procesados
    schema.parse(dataToValidate);

    // Si la validación pasa, reemplazamos req.body con los datos procesados.
    // Esto asegura que el controlador siempre reciba el objeto de datos limpio.
    req.body = dataToValidate;

    // Pasamos el control al siguiente middleware (el controlador)
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        error: error.issues.map((er) => ({
          path: er.path[0],
          message: er.message,
        })),
      });
    } else if (error instanceof SyntaxError) {
      return res.status(400).json({
        error: [
          {
            path: "data",
            message: "El formato de los datos no es válido. Se espera un JSON.",
          },
        ],
      });
    } else {
      console.error("validateFormsEvent error:", error);
      res.status(500).json({ message: "Ups, algo salió mal" });
    }
  }
};
