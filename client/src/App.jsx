import {Routes,Route} from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import LoginForm from './pages/LoginForm.jsx';
import SignUpForm from './pages/SignUpForm.jsx';
import { ToastContainer } from 'react-toastify'
import './index.css';


function App() {

 return (
    <>
    
     <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path="/login" element={<LoginForm/>}/>
      <Route path='/register' element={<SignUpForm/>}/>
    </Routes>
    </>
  )
}

export default App
