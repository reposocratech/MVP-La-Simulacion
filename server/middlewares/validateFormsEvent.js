import { ZodError } from "zod";

export const validateFormsEvent = (schema) => (req, res, next) => {
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
    } else {
      // 2. Manejar el caso donde los datos se envían directamente en req.body (sin Multer)
      dataToValidate = req.body;
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