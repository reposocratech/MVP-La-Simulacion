import multer from 'multer';

export const uploadImageAny = (folder) =>{
    const storage = multer.diskStorage({
        destination: `./public/images/${folder}`,
        filename: (req, file, callback) => {
            callback(null, "Img-" + Date.now() + "-" + file.originalname)
        }
    })

    const upload = multer({storage}).any();

    return upload;
}