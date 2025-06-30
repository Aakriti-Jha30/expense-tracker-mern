
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { useTransactionContext } from '../../context/TransactionContext';

const COLORS = ['#FF8042', '#0088FE', '#00C49F', '#FFBB28', '#FF6666', '#AA88EE', '#666666'];

const CategorySpend = () => {
  const {expenses}=useTransactionContext();
  console.log("Expenses in pie:",expenses);

    const categoryTotals={};
    expenses.forEach((expense)=>{
        const category=expense.category;
        const amount=expense.amount;
        if(!categoryTotals[category]){
            categoryTotals[category]=0; //Introduce the category
        }
        categoryTotals[category]+=Number(amount);
    })
  

  const pieData = Object.entries(categoryTotals).map(([name, value]) => ({ name, value }));

  return (
   <div className="p-4 bg-white rounded-xl shadow-lg max-w-sm mx-auto">
      <h2 className="text-lg font-bold text-gray-800 mb-4">Spending by Category</h2>
      {pieData.length > 0 ? (
        <div className="flex justify-center">
          <PieChart width={250} height={250}>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={70}
              label
            >
              {pieData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
      ) : (
        <p className="text-gray-500">No expenses to display</p>
      )}
    </div>
  );
}


export default CategorySpend;