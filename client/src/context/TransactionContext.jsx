import { createContext,useContext } from "react";
import useGetExpense from '../hooks/useGetExpense.jsx'
import { useAuthContext } from '../context/AuthContext.jsx'
import { useState ,useEffect} from "react";

const TransactionContext=createContext();

export const useTransactionContext=()=>{
    return useContext(TransactionContext);
}




export const TransactionContextProvider=({children})=>{
    const [refreshFlag,setrefreshFlag]=useState(0);
    const [expenses,setExpenses]=useState([]);
    const {getExpenses}=useGetExpense();
    const {authUser}=useAuthContext();

    useEffect(()=>{
        if(authUser){
        const fetchExpenses=async()=>{
          const res=await getExpenses();
          setExpenses(res||[]);
        }
        fetchExpenses();
    }
    },[refreshFlag,authUser])
    const triggerRefresh=()=>setrefreshFlag((prev)=>prev+1);

    return (
        <TransactionContext.Provider value={{refreshFlag,triggerRefresh,expenses}}>
            {children}
        </TransactionContext.Provider>
    )

}