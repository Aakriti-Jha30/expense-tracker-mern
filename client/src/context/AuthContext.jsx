import {createContext,useContext,useState,useEffect} from 'react';
import axios from 'axios';
export const AuthContext=createContext();

export const useAuthContext=()=>{
    return useContext(AuthContext);
}

export const AuthContextProvider=({children})=>{
    const [authUser,setauthUser]=useState(null);
    const [loading,setLoading]=useState(true);
    
    useEffect(()=>{
        const fetchUser=async()=>{
            try{
                const res=await axios.get('/api/user/me',{
                    withCredentials:true,
                })
                console.log("Fetching user from /api/user/me");
                console.log(res.data.user);
                setauthUser(res.data.user);

            }catch(error){
             setauthUser(null);
            }finally{
             setLoading(false);
            }
        };
        fetchUser();
        },[]);
        
        return (
            <AuthContext.Provider value={{authUser,setauthUser,loading}}>
                {children}
            </AuthContext.Provider>
        )

}