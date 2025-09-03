export const handleMulterError = (upload) => (req, res, next) => {
  upload(req, res, (err) => {
    if (err) {
      let message = "Error al subir el archivo.";
      let err_code = 0;

      if (err.message.includes("demasiado largo")) {
        message = err.message;
        err_code = 1;
      } else if (err.message.includes("Solo se permiten archivos")) {
        message = err.message;
        err_code = 2;
      } else if (err.code === "LIMIT_FILE_SIZE") {
        message = "El archivo excede el tamaño máximo permitido (15MB).";
        err_code = 3;
      }

      return res.status(400).json({ message, err_code });
    }
    next();
  });
};