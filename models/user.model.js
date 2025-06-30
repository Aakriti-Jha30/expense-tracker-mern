import mongoose from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const userSchema = new mongoose.Schema({
username:{
    required:[true,"name is required"],
    type:String,
},
password:{
    required:true,
    type:String,
    minLength:6,
},
email:{
    type:String,
    required:[true,'Email required and should be unique'],
    unique:true,
},
refreshToken:{
    type:String,
}
},{timestamps:true});

userSchema.pre('save',async function(next){
    if(!this.isModified('password'))return next();
    this.password=await bcrypt.hash(this.password,10);
    next();
})

userSchema.methods.isPasswordCorrect=async function(pass){
    return await bcrypt.compare(pass,this.password);
}

userSchema.methods.generateAccessToken=function(){
    return jwt.sign(  
            {
                _id:this.id,
                email:this.email,
                username:this.username,
                
            },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn:process.env.ACCESS_TOKEN_EXPIRY,
            },
        
    )
};
userSchema.methods.generateRefreshToken=function(){
    return jwt.sign(  
            {
                _id:this.id,
            },
            process.env.REFRESH_TOKEN_SECRET,
            {
                expiresIn:process.env.REFRESH_TOKEN_EXPIRY,
            },
    )
};

export const User=mongoose.model('User',userSchema);

