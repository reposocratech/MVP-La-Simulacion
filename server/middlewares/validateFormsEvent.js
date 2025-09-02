import { ZodError } from "zod";

export const validateFormsEvent = (schema) => (req, res, next) => {
  try {
    // Debug opcional: ver qué llega realmente
    // console.log(">>>> tipo de dataTotal:", typeof req.body.dataTotal);
    // console.log(">>>> valor de dataTotal:", req.body.dataTotal);

    if (req.body.dataTotal && req.body.dataTotal !== "undefined") {
      if (typeof req.body.dataTotal === "string") {
        // Si es string, intentamos parsear
        try {
          req.body = JSON.parse(req.body.dataTotal);
        } catch (e) {
          return res.status(400).json({
            error: [
              {
                path: "data",
                message:
                  "El formato de los datos no es válido. Se espera un JSON válido.",
              },
            ],
          });
        }
      } else if (typeof req.body.dataTotal === "object") {
        // Si ya es objeto, lo usamos directamente
        req.body = req.body.dataTotal;
      }
    }

    // Validación con Zod
    schema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        error: error.issues.map((er) => ({
          path: er.path[0],
          message: er.message,
        })),
      });
    } else {
      console.error("validateFormsEvent error:", error);
      res.status(500).json({ message: "Ups, algo salió mal" });
    }
  }
};

