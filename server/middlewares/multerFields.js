import multer from 'multer';

export const uploadImageFields = (folder) =>{
    const storage = multer.diskStorage({
        destination: `./public/images/${folder}`,
        filename: (req, file, callback) => {
            callback(null, "Img-" + Date.now() + "-" + file.originalname)
        }
    })

    const upload = multer({storage}).fields(
        [
            { name: 'cover_image', maxCount: 1 },
            { name: 'section1', maxCount: 3 },
            { name: 'section2', maxCount: 3 }
        ]
    );

    return upload;
}