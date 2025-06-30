
import { Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-purple-600 via-blue-600 to-blue-500 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <p className="text-blue-100 text-sm">
            © 2025 ExpenseTracker. All rights reserved.
          </p>
          <div className="flex items-center space-x-2 mt-2 sm:mt-0">
            <Mail className="h-4 w-4 text-emerald-300" />
            <span className="text-blue-100 text-sm">support@expensetracker.com</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;