import { useState } from "react";
import {toast} from 'react-toastify'
import axios from 'axios';
import { useNavigate} from "react-router-dom";
import { useAuthContext } from "../context/AuthContext.jsx";


const useLogin=()=>{
    const [loading,setLoading]=useState(false);
    const {setauthUser}=useAuthContext();
    const navigate=useNavigate();

    const login=async(username,password)=>{ 
      //We will add validations here later
      setLoading(true);
      
      try{
        const response=await axios.post(
            "/api/user/login",
            {username,password},
            {withCredentials:true},
        );
        setauthUser(response.data.user);
        toast.success("Login successful");
        navigate("/")
        return response.data;

      }catch(error){
        const msg=error.response?.data?.error ||"Login failed";
        toast.error(msg);
      }finally{
        setLoading(false);
      }

    }
    return {login,loading}
}

export default useLogin;