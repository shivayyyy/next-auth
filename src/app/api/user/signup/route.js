import { connect } from "@/dbConnection/dbConnect.js";
import User from "@/model/userModel.js";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

await connect();
console.log("Database connected successfully");

export async function POST(request) {
    try {
        const reqBody = await request.json();
        const { name, email, password } = reqBody;

        console.log("Request body:", reqBody);

        // Check if user exists
        console.log("Checking if user exists with email:", email);
        const user = await User.findOne({ email });
        console.log("User found:", user);

        if (user) {
            console.log("User already exists");
            return NextResponse.json({ message: "User already exists" }, { status: 400 });
        }

        // Hash the password
        console.log("Hashing password...");
        const salt = await bcryptjs.genSalt(10);
        const hashedPass = await bcryptjs.hash(password, salt);
        console.log("Password hashed successfully");

        // Create a new user
        console.log("Creating new user...");
        const newUser = new User({
            name,
            email,
            password: hashedPass,
        });

        console.log("Saving user to database...");
        const saveUser = await newUser.save();
        console.log("User saved successfully:", saveUser);

        return NextResponse.json({
            success: true,
            message: "User created successfully",
            status: 200,
            saveUser,
        });
    } catch (error) {
        console.error("Error in signup route:", error);
        return NextResponse.json({ message: "Internal server error", error: error.message }, { status: 500 });
    }
}