import mongoose from "mongoose";

const connectDB=async()=>{
    try{
        const dbResponse=await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB:host:",dbResponse.connection.name);


    }catch(error){
        console.log("Error connecting to databasse",error);

    }

}
export {connectDB};