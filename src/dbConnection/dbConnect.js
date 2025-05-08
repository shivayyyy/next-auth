
import mongoose from "mongoose";
export async function connect(){
    
    try {
        if (!process.env.MONGO_URI) {
            throw new Error("MONGO_URI is not defined in the environment variables");
        }
    
        await mongoose.connect(process.env.MONGO_URI);
        const connection=mongoose.connection;
        connection.on('connected', ()=>{
            console.log("connection with db is successful")
        }) 

        connection.on('error', ()=>{
            console.log("error while connecting to db:" , error)
            process.exit(1);
        })
    } catch (error) {
        console.log(error);
        console.log("some unidentified error")
    }
}