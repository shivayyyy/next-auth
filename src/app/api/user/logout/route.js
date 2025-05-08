import { NextResponse } from "next/server";

export async function GET() {
    try {
        const res=NextResponse.json({message:"logout successfully",
            success:true,
        })
        res.cookies.set("token", "", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/", 
        });
        return res;
        
    } catch (error) {
        return NextResponse.json({message:error.message},{status:500})
    }
}