import dotenv from "dotenv";
import nodemailer from "nodemailer"

dotenv.config();

const sendConfirmationMail =  nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
    //Ignorar certificados
    tls: {
        rejectUnauthorized: false,
    },
})

export default sendConfirmationMail ;