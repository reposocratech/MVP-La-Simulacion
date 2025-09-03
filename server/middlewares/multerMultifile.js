import multer from 'multer';

export const uploadImageMulti = (folder) => {
  const storage = multer.diskStorage({
    destination: `./public/images/${folder}`,
    filename: (req, file, callback) => {
      // Validar longitud del nombre original
      if (file.originalname.length > 200) {
        return callback(new Error("El nombre del archivo es demasiado largo (máximo 200 caracteres)."));
      }

      // Guardar con prefijo + timestamp
      callback(null, "Img-" + Date.now() + "-" + file.originalname);
    },
  });

  const upload = multer({
    storage,
    // Validamos que sea imagen
    fileFilter: (req, file, callback) => {
      if (!file.mimetype.startsWith("image/")) {
        return callback(new Error("Solo se permiten archivos de imagen."));
      }
      callback(null, true);
    },
    limits: {
      fileSize: 15 * 1024 * 1024, // máximo 15MB por archivo
    },
  }).array("file"); 

  return upload;
};