import nodemailer from "nodemailer";
import User from "@/model/userModel";
import bcryptjs from "bcryptjs";

export const sendMail=async({email,processType,userId})=>{
    try {
        //create hashed token
        const hashedToken=await bcryptjs.hash(userId.toString(),10)

        if(processType==="VERIFY"){
            await User.findByIdAndUpdate(userId,{
                verifyToken:hashedToken,
                verifyTokenExpiry:Date.now()+3600000
            })
        }
        else if(processType==="RESET"){
            await User.findByIdAndUpdate(userId,{
                fpToken:hashedToken,
                fpTokenExpiry:Date.now()+3600000
            })
        }


        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: process.env.MAIL_TRAP_USER,
              pass: process.env.MAIL_TRAP_PASS,
            }
          });


    } catch (error) {
        throw new Error(error.message)
    }
}