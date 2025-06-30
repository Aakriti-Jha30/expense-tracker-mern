import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FormModal from './FormModal';
import { useTransactionContext } from '../../context/TransactionContext';


import { Plus, DollarSign, Wallet, TrendingDown, PieChart } from 'lucide-react';

export default function ExpensePage() {
  const [isOpen, setIsOpen] = useState(false);
  const [BudgetModalOpen,setIsBudgetModalOpen]=useState(false);
  const [monthlyBudget,setMonthlyBudget]=useState(0);
 

  const {expenses}=useTransactionContext();

  useEffect(()=>{
    const getBudget=async()=>{
      try{
      const res=await axios.get('/api/budget/getBudget',
      {withCredentials:true},
      );
      setMonthlyBudget(res.data.budget);
    }catch(error){
    console.log(error);
    }
    }
    getBudget();

  },[])

  const handleBudget=async()=>{
    try{
      await axios.post('/api/budget/setBudget',
        {budget:monthlyBudget},
        {withCredentials:true},
      );
      
    }catch(error){
     console.log(error);
    }finally{
      setIsBudgetModalOpen(false);
    }
  }


 // const monthlyBudget = 3000;
  const totalExpenses = expenses.reduce((sum,item)=>sum+Number(item.amount),0);
  const remainingBudget = Math.max(monthlyBudget - totalExpenses,0);
  const usagePercentage = Math.min(totalExpenses / monthlyBudget,100) * 100;

  return (

     <div className="max-w-5xl mx-auto space-y-8 px-4">
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
           <div className="flex items-center space-x-2">
  <button
    onClick={() => setIsOpen(true)}
    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
  >
    <Plus className="h-5 w-5" />
    <span>Add Expense</span>
  </button>

  <button
    onClick={() => setIsBudgetModalOpen(true)}
    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
  >
    <DollarSign className="h-5 w-5" />
    <span>Set Budget</span>
  </button>
</div>
</div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
            <div className="flex items-center space-x-3">
              <div className="bg-blue-100 p-2 rounded-full">
                <Wallet className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Monthly Budget</p>
                <p className="text-xl font-bold text-gray-900">₹{monthlyBudget}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="bg-red-100 p-2 rounded-full">
                <TrendingDown className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Expenses</p>
                <p className="text-xl font-bold text-red-600">₹{totalExpenses}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="bg-green-100 p-2 rounded-full">
                <DollarSign className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Remaining</p>
                <p className="text-xl font-bold text-green-600">₹{remainingBudget}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="bg-purple-100 p-2 rounded-full">
                <PieChart className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Usage</p>
                <p className="text-xl font-bold text-purple-600">{usagePercentage.toFixed(1)}%</p>
              </div>
            </div>
          </div>
           </div>
     

     
      {isOpen && <FormModal setIsOpen={setIsOpen} />}
      {BudgetModalOpen && (
  <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-lg shadow-md w-[300px]">
      <h2 className="text-xl font-semibold mb-4 text-center">Set Monthly Budget</h2>
      <input
        type="number"
        className="w-full p-2 border border-gray-300 rounded mb-4"
        placeholder="Enter budget"
        value={monthlyBudget}
        onChange={(e) => setMonthlyBudget(Number(e.target.value))}
      />
      <div className="flex justify-end space-x-2">
        <button
          onClick={() => setIsBudgetModalOpen(false)}
          className="px-3 py-1 rounded bg-gray-300 hover:bg-gray-400 text-sm"
        >
          Cancel
        </button>
        <button
          onClick={handleBudget}
          className="px-3 py-1 rounded bg-blue-600 hover:bg-blue-700 text-white text-sm"
        >
          Save
        </button>
      </div>
    </div>
  </div>
)}

   </div>
  );
}
