import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuthContext } from '../context/AuthContext';

function useLogout() {
  const {setauthUser}=useAuthContext();
  const navigate=useNavigate();
  const logout=async()=>{
    try{
    await axios.post( "/api/user/logout",{ withCredentials:true });
    setauthUser(null);
    navigate("/login");
    toast.success("Logout Successful")
    }catch(error){
        const msg=error||"Logout failed";
        toast.error(msg)
    }
  }
  return {logout};
}

export default useLogout