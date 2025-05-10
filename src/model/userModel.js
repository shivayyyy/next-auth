import { verify } from "jsonwebtoken";
import mongoose from "mongoose";


const userSchema=new mongoose.Schema({
    name:{
        type:String,
        require: [true, "name is required"],
    },
    password:{
        type: String,
        require: [true]
    },
    email:{
        type: String,
        require:[true,"email is required"],
        unique: true,
    },
    isVerified:{
        type: Boolean,
        default:false,
    },
    isAdmin:{
        type: Boolean,
        default: false,
    },
    fpToken: {
        type: String,
        default: null,
    },
    fpTokenExpiry: {
        type: Date,
        default: null,
    },
    verifyToken: {
        type: String,
        default: null,
    },
    verifyTokenExpiry: {
        type: Date,
        default: null,
    },
},{timestamps:true})

const User = mongoose.models.Users || mongoose.model("Users", userSchema);
export default User;