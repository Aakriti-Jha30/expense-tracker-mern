import { useState } from "react";
import {toast} from 'react-toastify'
import axios from 'axios';
import { useNavigate } from "react-router-dom";


const useSignup=()=>{
    const [loading,setLoading]=useState(false);
    const navigate=useNavigate();

    const signup=async(username,password,email)=>{
      //We will add validations here later
      setLoading(true);
       
      try{
        const response=await axios.post(
            "/api/user/signup",
            {username,password,email},
            {withCredentials:true},
        );
      
        toast.success("Signup successful");
        navigate("/login");
        return response.data;

      }catch(error){
        const msg=error.response?.data?.error ||"Signup failed";
        toast.error(msg);
      }finally{
        setLoading(false);
      }

    }
    return {signup,loading}
}

export default useSignup;