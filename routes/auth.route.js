import { Router } from "express";
import { signupUser,loginUser,logoutUser } from "../controllers/user.auth.js";
import {verifyJWT} from "../middlewares/auth.middleware.js"
const router=Router();

router.route('/signup').post(signupUser);
router.route('/login').post(loginUser);
router.route('/logout').post(verifyJWT,logoutUser);
router.route('/me').get(verifyJWT,(req,res)=>{
    const user=req.user;
    res.status(200).json({user}); 
}) 

export default router;  