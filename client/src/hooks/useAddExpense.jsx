
import axios from 'axios'

const useAddExpense = () => {
  
  const AddExpenses=async(expenseData)=>{
   
    try{
        await axios.post("/api/transaction/postNewTransactions",
            expenseData,
        );
        return true;
    }catch(error){
        console.log(error);

    }

  } 

  return {AddExpenses};
}

export default useAddExpense;