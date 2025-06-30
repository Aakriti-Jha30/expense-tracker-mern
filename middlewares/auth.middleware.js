import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";


export const verifyJWT=async(req,res,next)=>{
   try{
   const token=req.cookies?.accessToken;
  // console.log(token);
   if(!token)return res.status(400).json({error:"Unauthorized access"});

   const decodedToken=jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);

   const user=await User.findById(decodedToken._id);

    if(!user){
          return res.status(400).json({error:"Invalid Token"}); 
    }
   
   req.user=user;

   next();
}catch(error){
    console.log(error);
    return res.status(400).json({error:"Some error occured while validating the user"}); 
}
}