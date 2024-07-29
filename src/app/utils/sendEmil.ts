
import nodemailer from 'nodemailer';

export const sendEmail = async(to:string,html:string)=>{
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com.",
        port: 587,
        secure: false, // Use `true` for port 465, `false` for all other ports
        auth: {
          user: "ashrafulfahim07@gmail.com",
          pass: "ttkh rsqp pvru lmxt",
        },
      });
      
      
        await transporter.sendMail({
          from: 'ashrafulfahim07@gmail.com', // sender address
          to, // list of receivers
          subject: "Reset your password", // Subject line
          text: "You can reset your password through this link ", // plain text body
          html, // html body
        });
      
        // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
     
}