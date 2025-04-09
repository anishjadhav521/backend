"use strict";
// import nodemailer from "nodemailer"
// import AppDataSource from "../configuration/config"
// import { User } from "../entities/user"
// import { Profile } from "../entities/profile"
// import crypto from "crypto"
// import { log } from "console"
// const profileRepository = AppDataSource.getRepository(Profile)
// const userRepository = AppDataSource.getRepository(User)
// const transporter =nodemailer.createTransport({
//     service:'gmail',
//     auth:{
//         user:'mumbagram@gmail.com',
//         pass:'hfsv ydra etvs tgps'
//     }
// })
// const sendEmail =(to:string,subject:string,html:string)=>{
//     return transporter.sendMail({from:'mumbagram@gmail.com',to,subject,html})
// }
// class SendMailService{
//     async reqResetToken(body:any){
//         const {email}=body
//         const user = await profileRepository.findOneBy({ email })
//         if(!user) return "user not found"
//         const token = crypto.randomBytes(32).toString('hex')
//         user.resetToken = token
//         user.resetTokenExpiry = new Date(Date.now() + 15*60*1000);
//         await profileRepository.save(user);
//         const resetLink = `http://localhost:4200/reset-password/${token}`
//         const result = await sendEmail(email,'Reset your passwore', `<p>click<a href="${resetLink}">here</a> to reset your password .</p>`);
//         return result;
//     }
//     resetPass =async(body:any)=>{
//         const {token,newPassword}=body;
//         const profile = await profileRepository.findOne({
//           where: {
//             resetToken:token
//         },
//             relations:{
//                 user:true
//         }
//         }
//         );
//         if(!profile || profile.resetTokenExpiry<new Date()){
//             return "try again"
//         }
//         profile.user.password = newPassword;
//         profile.resetToken != null;
//         // profile.resetTokenExpiry  = null;
//         const result = await profileRepository.save(profile);
//         console.log(result);
//         return result;
//     }
// }
// export default new  SendMailService()
