// import { Injectable } from "@nestjs/common";
// import { config } from "dotenv";
// import * as nodemailer from "nodemailer"

// config()
// @Injectable()
// export class EmailService {
//     private transporter: nodemailer

//     constructor() {
//         this.transporter = nodemailer.createTransport({
//             service: process.env.SERVICE,
//             auth:{
//                 user: process.env.USER,
//                 pass: process.env.EMAILPASSWORD
//             }
//         })
//     }

//     async emailSender (to: string, subject: string, text: string ) {
//         console.log(to)
//         const mailOptions = {
//             from: process.env.USER,
//             to,
//             subject,
//             text,

//         }
//         await this.transporter.sendMail(mailOptions).
//     }

// }

  
  
  
  
  
  