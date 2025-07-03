
import {useForm} from 'react-hook-form'
import useAddExpense from '../../hooks/useAddExpense';
import { useTransactionContext } from '../../context/TransactionContext';

const FormModal = ({setIsOpen}) => {
    const {triggerRefresh}=useTransactionContext();

    const {AddExpenses}=useAddExpense();
    const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const ok=await AddExpenses(data);
    if(ok){
      triggerRefresh();
      reset();
      setIsOpen(false);
    }
    
  };

  

  return (


     <div className="fixed inset-0 z-50 flex justify-center items-center">
      <div className="relative bg-white rounded-lg w-full max-w-md p-6 shadow-lg">
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Add Expense</h3>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-400 hover:text-gray-900"
          >
            ✕
          </button>
        </div>

     <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-4 mb-4 grid-cols-2">
                <div className="col-span-2">
                  <label className="block mb-1 text-sm font-medium text-gray-900">
                    Name
                  </label>
                  <input
                    {...register('name', { required: 'Name is required' })}
                    className="w-full p-2 border rounded-lg bg-gray-50 text-sm"
                    placeholder="Type expense name"
                  />
                  {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
                </div>

                <div className="col-span-2 sm:col-span-1">
                  <label className="block mb-1 text-sm font-medium text-gray-900">
                    Price
                  </label>
                  <input
                    type="number"
                    {...register('amount', { required: 'Price is required', min: 0 })}
                    className="w-full p-2 border rounded-lg bg-gray-50 text-sm"
                    placeholder="₹299"
                  />
                  {errors.amount && <p className="text-red-500 text-xs">{errors.price.message}</p>}
                </div>

                <div className="col-span-2 sm:col-span-1">
                  <label className="block mb-1 text-sm font-medium text-gray-900">
                    Date
                  </label>
                  <input
                    type="date"
                    {...register('date', { required: 'Date is required' })}
                    className="w-full p-2 border rounded-lg bg-gray-50 text-sm"
                  />
                  {errors.date && <p className="text-red-500 text-xs">{errors.date.message}</p>}
                </div>

                <div className="col-span-2 sm:col-span-1">
                  <label className="block mb-1 text-sm font-medium text-gray-900">
                    Category
                  </label>
                  <select
                    {...register('category', { required: 'Category is required' })}
                    className="w-full p-2 border rounded-lg bg-gray-50 text-sm"
                  >
                    <option value="">Select category</option>
                    <option value="Food">Food</option>
                    <option value="Transportation">Travel</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Shopping">Shopping</option>
                    <option value="Education">Education</option>
                    <option value="Bills">Bills</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.category && (
                    <p className="text-red-500 text-xs">{errors.category.message}</p>
                  )}
                </div>

                <div className="col-span-2 sm:col-span-1">
                  <label className="block mb-1 text-sm font-medium text-gray-900">
                    Reference
                  </label>
                  <input
                    {...register('reference')}
                    className="w-full p-2 border rounded-lg bg-gray-50 text-sm"
                    placeholder="Optional reference"
                  />
                </div>

                <div className="col-span-2">
                  <label className="block mb-1 text-sm font-medium text-gray-900">
                    Description
                  </label>
                  <textarea
                    rows="3"
                    {...register('description')}
                    className="w-full p-2 border rounded-lg bg-gray-50 text-sm"
                    placeholder="Write description..."
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5"
              >
                Add Expense
              </button>
            </form>
         </div>
    </div>
  )
}

export default FormModal

