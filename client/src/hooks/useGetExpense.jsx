import axios from 'axios';


const useGetExpense = () => {
  const getExpenses=async()=>{
    try{
    const response=await axios.get("/api/transaction/getTransactions");
    console.log("API Called")
    return response.data;
    }catch(error){
        console.log(error);
    }

  }
  return {getExpenses}
}

export default useGetExpense;