import { NextResponse } from "next/server";

import User from "@/model/userModel";
import { connect } from "@/dbConnection/dbConnect";
import jwt from "jsonwebtoken"


connect();


export async function GET(req) {
    try {
        const token=await req.cookies.get('token')?.value||'';
        const decoded=await jwt.verify(token,process.env.TOKEN_SECRET)
        console.log(decoded)
        

        const user=await User.findById(decoded.id).select("-password");
        console.log(user)
        return NextResponse.json({message:"user found",
            data:user,
        })



        
    } catch (error) {
        return NextResponse.json({error:error.message},{status:500})
    }
} 