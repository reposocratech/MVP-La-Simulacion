import multer from 'multer';

export const uploadImageSingle= (folder) =>{
    const storage = multer.diskStorage({
        destination: `./public/images/${folder}`,
        filename: (req, file, callback) => {
            callback(null, "Img-" + Date.now() + "-" + file.originalname)
        }
    })

    const upload = multer({storage}).single("file");

    return upload;
}