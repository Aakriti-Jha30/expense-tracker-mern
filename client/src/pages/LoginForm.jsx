import React, { useState } from 'react';
import {Link} from 'react-router-dom'
import { useForm } from 'react-hook-form';
import useLogin from '../hooks/useLogin';
import { Eye, EyeOff, User, Lock, TrendingUp, Sparkles, ChevronRight } from 'lucide-react';

export default function  LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const {login,loading}=useLogin();

  const onSubmit = async ({username,password}) => {
    login(username,password);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4 relative overflow-hidden">
   
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-pink-500 to-violet-500 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full blur-3xl opacity-10"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
     
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-emerald-400 to-cyan-400 rounded-2xl mb-6 shadow-2xl transform hover:scale-105 transition-transform duration-300 relative">
            <TrendingUp className="w-10 h-10 text-white" />
            <Sparkles className="w-6 h-6 text-white absolute -top-2 -right-2 animate-bounce" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent mb-3">
            ExpenseTracker
          </h1>
          <p className="text-gray-300 text-lg">Track smarter, spend better</p>
        </div>

       
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20 space-y-6"
        >
         
          <div className="group">
            <label htmlFor="username" className="block text-sm font-semibold text-white mb-3">
              Username
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center ">
                <User className="h-5 w-5 text-emerald-400  drop-shadow-sm" />
              </div>
              <input
                id="username"
                type="text"
                {...register('username', { required: 'Username is required' })}
                className="block w-full pl-12 pr-4 py-4 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all duration-300 hover:bg-white/25"
                placeholder="Enter your username"
              />
            </div>
            {errors.username && (
              <p className="text-red-300 text-sm mt-1">{errors.username.message}</p>
            )}
          </div>

        
          <div className="group">
            <label htmlFor="password" className="block text-sm font-semibold text-white mb-3">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-cyan-400" />
              </div>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                {...register('password', { required: 'Password is required', minLength: {value: 6, message: 'Password should be at least 6 characters long'  }})}
                className="block w-full pl-12 pr-14 py-4 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300 hover:bg-white/25"
                placeholder="Enter your password" 
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center hover:scale-110 transition-transform duration-200"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-300 hover:text-cyan-300 drop-shadow" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-300 hover:text-cyan-300 drop-shadow" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-300 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

        
          <button
            type="submit"
            disabled={loading}
            className={`w-full relative overflow-hidden group ${
              loading
                ? 'bg-gray-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-500 hover:from-emerald-400 hover:via-cyan-400 hover:to-blue-400 active:scale-95'
            } py-4 px-6 rounded-xl shadow-lg text-white font-bold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl`}
          >
            <div className="flex items-center justify-center space-x-2">
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                  <span>Logging in...</span>
                </>
              ) : (
                <>
                  <span>Log In</span>
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </>
              )}
            </div>
            {!loading && (
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            )}
          </button>

        
          <div className="mt-8 text-center">
            <p className="text-gray-300">
              Don't have an account?{' '}
              <button className="font-bold text-emerald-400 hover:text-emerald-300 hover:underline transition-colors duration-200">
                <Link to="/register">SignUp Now</Link>
              </button>
            </p>
          </div>
        </form>

      
        <div className="text-center mt-8 text-gray-400">
          <p className="text-sm">&copy; ExpenseTracker. Made with ❤️ for smart spenders</p>
        </div>
      </div>
    </div>
  );
}
