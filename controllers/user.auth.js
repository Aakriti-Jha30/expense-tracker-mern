import {User} from '../models/user.model.js'


const generateAccessTokenRefreshToken=async(userId)=>{
     try{
      const user=await User.findById(userId);
      if(!user){
        return res.status(400).json("Please signup first");
      }
      const accessToken=user.generateAccessToken();
      const refreshToken=user.generateRefreshToken();
  

      user.refreshToken=refreshToken;
      await user.save({validateBeforeSave:false});
      return {accessToken,refreshToken};

     }catch(error){
         console.log(error);
         return res.status(400).json({error:"Some error occured while trying to generate tokens"});
     }

}

const signupUser=async(req,res)=>{
    const {username,password,email}=req.body;
   
    if([username,email,password].some((field)=>field?.trim==="")){
        return res.status(400).json({error:"Some of the required fields are empty "});
    }
//     if ([username, email, password].some(field => !field || field.trim() === "")) {
//   return res.status(400).json({ error: "Some of the required fields are empty" });
// }

    const user=await User.findOne({
        $or:[{username},{email}]
    })

//console.log("Matching user in DB:", user);

    if(user){
        return res.status(400).json({error:"User already exists"});
    }
    const newUser=await User.create({
        username:username,
        email:email,
        password:password,
    })

    //In response we do not send the
    const createdUser=await User.findById(newUser._id).select(
        "-password"
    )
    if(!createdUser){
        return res.status(400).json({error:"Error creating user"});
    }
    return res.status(201).json(
    {
    message: "User created successfully", 
    user: createdUser ,
    }
    )
}

const loginUser=async(req,res)=>{
    const {username,password}=req.body;
    const user=await User.findOne({username});
    if(!user){
         return res.status(400).json({error:"User not registered"});
    }
    const isValid=await user.isPasswordCorrect(password);
    if(!isValid)return res.status(400).json({error:"Password Incorrect"});
    
    const {accessToken,refreshToken}=await generateAccessTokenRefreshToken(user._id);

    const loggedUser=await User.findById(user._id).select(
        "-password -refreshToken"
    );
    if(!loggedUser)return res.status(400).json({error:"Error Logging in"});

     const options={
            httpOnly:true,
            secure:true,
            sameSite: "strict",
        }
    
        return res
        .status(200)
        .cookie("accessToken",accessToken,options)
        .cookie("refreshToken",refreshToken,options)
        .json(
        {
        message: "Login successful",
        user: loggedUser,
        accessToken,
        refreshToken
        }
        )
}
const logoutUser=async(req,res)=>{
const user=req.user;
await User.findByIdAndUpdate(user._id,
    {
    $set:{
        refreshToken:undefined
    }
    },
    {
        new:true,
    }
)
const options={
    httpOnly:true,
    secure:true,
    
}
return res.status(200).clearCookie("accessToken",options).clearCookie("refreshToken",options).json({message:"User logged out sucessfully"})
}







export  {signupUser, loginUser,logoutUser};
