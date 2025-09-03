import multer from 'multer';

export const uploadImageAny = (folder) =>{
    const storage = multer.diskStorage({
        destination: `./public/images/${folder}`,
        filename: (req, file, callback) => {
            if (file.originalname.length > 200) {
                return callback(new Error("El nombre del archivo es demasiado largo (máximo 200 caracteres)."));
            }

            callback(null, "Img-" + Date.now() + "-" + file.originalname)
        }
    })

    const upload = multer({
        storage,

         fileFilter: (req, file, callback) => {
            if (!file.mimetype.startsWith("image/")) {
                return callback(new Error("Solo se permiten archivos de imagen."));
            }
            callback(null, true);
        },
        limits: {
            fileSize: 5 * 1024 * 1024, // máximo 5MB por archivo
        },
    }).any();

    return upload;
}