import {useState} from 'react'
import useLogout from '../../hooks/useLogout';
import CategorySpend from '../Reports/CategorySpend.jsx';
import { TrendingUp, LogOut } from 'lucide-react';

const Header = () => {
  const {logout}=useLogout();
  const [ showReportBox ,setShowReportBox]=useState(false);
  
  let handleLogout=()=>{
    logout();
  }
  return (
    <header className="bg-gradient-to-r from-purple-600 via-blue-600 to-blue-500 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
         
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-br from-emerald-400 to-cyan-400 p-2 rounded-xl shadow-lg">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">ExpenseTracker</h1>
              <p className="text-xs text-blue-100 hidden sm:block">Track smarter, spend better</p>
            </div>
          </div>

         
          <div className="flex items-center space-x-4">
           
          <button
  onClick={() => setShowReportBox((prev) => !prev)}
  className="text-white hover:text-emerald-300 transition-colors duration-200 font-medium relative"
>
  Reports
</button>


{showReportBox && (
  <div className="absolute top-16 right-20 bg-white shadow-xl rounded-xl p-4 w-72 z-50">
    <div className="flex justify-between items-center mb-2">
      <h3 className="text-sm font-semibold text-gray-700">Quick Insights</h3>
      <button
        onClick={() => setShowReportBox(false)}
        className="text-gray-400 hover:text-red-500 text-xs"
      >
        ✕
      </button>
    </div>
   <CategorySpend/>
  </div>
)}


      
            <button onClick={handleLogout} className="flex items-center space-x-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors duration-200 font-medium">
              <LogOut className="h-4 w-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;