import { connect } from "@/dbConnection/dbConnect.js";
import User from "@/model/userModel.js";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken"


await connect();
console.log("db connected")
export async function POST(req){

   try {
     //get the response
 
     const reqBody=await req.json();
     console.log(reqBody)
     const {email,password}=reqBody;
     
 
     //check for user exist or not
 
     const user=await User.findOne({email});
     console.log("found user", user)
 
     if(!user){
         return NextResponse.json({error:"user doesn't exist"},{status:400})
     }
 
     //check for password
 
     const validPass=await bcryptjs.compare(password,user.password);
     console.log("Password comparison result:", validPass);

     
     if(!validPass){
         return NextResponse.json({error:"invalid password"},{status:400})
     }
 
     //cretae token data
     const tkData={
         id:user._id,
         name:user.name,
     }
 
     //cretae token
 
     const token=await jwt.sign(tkData,process.env.TOKEN_SECRET,{expiresIn:"2d"})
     console.log("token is cretaed",token)
     //adding token to body
     const response=NextResponse.json({
         success:true,
         message:"logged In successfully"
     })
 
     response.cookies.set("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/", 
    });
     console.log("tokrn added to body",response)
 
     return response;
   } catch (error) {
      return NextResponse.json({error:error.message},{status:500})
   }


}