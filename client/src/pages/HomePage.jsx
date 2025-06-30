import { useEffect } from 'react'
import Layout from '../components/Layouts/Layout.jsx'
import { useNavigate } from 'react-router-dom'
import AddExpense from '../components/Expenses/AddExpense.jsx'
import GetExpense from '../components/Expenses/GetExpense.jsx'
import { useAuthContext } from '../context/AuthContext.jsx'

const HomePage = () => {
  const {authUser,loading}=useAuthContext();
  const navigate=useNavigate();
  useEffect(() => {
  if (!loading && !authUser) {
    navigate('/login');
  }
}, [authUser, loading]);

  return (
   
    <Layout>
        <AddExpense/>
        <GetExpense/>
    </Layout>
   
  )
}

export default HomePage