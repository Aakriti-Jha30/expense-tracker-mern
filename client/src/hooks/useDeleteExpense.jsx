import axios from "axios";

export const useDeleteExpense=()=>{
   const deleteExpense=async(id)=>{
    try{

      if (!id || typeof id !== "string") {
    console.error("❌ Invalid expense ID:", id);
    return;
  }
    const res=await axios.delete(`/api/transaction/deleteTransaction/${id}`);
    return res.data;
    }catch(error){
        console.log(error);
    }
    }
    return {deleteExpense};
}