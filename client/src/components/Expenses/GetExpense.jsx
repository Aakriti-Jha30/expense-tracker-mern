import { useState } from 'react';
import { useDeleteExpense } from '../../hooks/useDeleteExpense';
import { useTransactionContext } from '../../context/TransactionContext';
import { Trash2, Calendar, Tag } from 'lucide-react';

const GetExpense = () => {

  const [categoryFilter, setCategoryFilter] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const {deleteExpense}=useDeleteExpense();
  const {triggerRefresh,expenses}=useTransactionContext();



  const handleDelete=async (id)=>{
    const res=await deleteExpense(id);
    if(res){
      triggerRefresh();
    }
  };


  const filteredExpenses=expenses.filter((expense)=>{
  
    const matchingCategory=categoryFilter?expense.category===categoryFilter:true;
    const matchingStartDate=startDate?new Date(expense.date)>=new Date(startDate):true;
    const matchingEndDate=endDate?new Date(expense.date)<=new Date(endDate):true;
     console.log({ matchingCategory, matchingStartDate, matchingEndDate });
    return matchingCategory && matchingStartDate && matchingEndDate;


  })
  const categoryColors = {
    'Food': 'bg-orange-100 text-orange-800',
    'Transportation': 'bg-blue-100 text-blue-800',
    'Entertainment': 'bg-purple-100 text-purple-800',
    'Shopping': 'bg-pink-100 text-pink-800',
    'Bills': 'bg-red-100 text-red-800',
    'Education':'bg-red-100 text-red-800',
    'Other': 'bg-gray-100 text-gray-800'
  };
  
  return (
   
      <div className="max-w-4xl mx-auto">
       
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Your Expenses</h2>
          <p className="text-gray-600">{filteredExpenses.length} expenses found</p>
        </div>

          <div className="bg-slate-50 p-4 rounded-xl shadow-md mb-6 flex flex-wrap items-center gap-4">
        
          <div className="flex flex-col w-full sm:w-auto">
            <label className="text-sm text-gray-600">Category</label>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded-lg text-sm"
            >
              <option value="">All</option>
              {Object.keys(categoryColors).map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

        
          <div className="flex flex-col">
            <label className="text-sm text-gray-600">From</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded-lg text-sm"
            />
          </div>

         
          <div className="flex flex-col">
            <label className="text-sm text-gray-600">To</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded-lg text-sm"
            />
          </div>
        </div>

 
        <div className="bg-white p-4 rounded-xl shadow mb-4">
          {filteredExpenses.length === 0 ? (
            <div className="p-8 text-center">
              <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Tag className="h-8 w-8 text-gray-400" />
              </div>
              <p className="text-gray-500 text-lg">No expenses yet</p>
              <p className="text-gray-400">Add your first expense to get started</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-300">
              {filteredExpenses.map((expense, index) => (
                <div key={expense._id} className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-gray-600">
                            {index + 1}
                          </span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="text-lg font-medium text-gray-900">{expense.name}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${categoryColors[expense.category] || categoryColors['Other']}`}>
                            {expense.category}
                          </span>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4" />
                           <span>{new Date(expense.date).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="text-right">
                        <p className="text-xl font-bold text-gray-900"> ₹{Number(expense.amount).toFixed(2)}</p>
                      </div>
                      <button onClick={()=>handleDelete(expense._id)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      
      </div>
    
  );
};

export default GetExpense;