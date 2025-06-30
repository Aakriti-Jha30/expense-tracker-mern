import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import { AuthContextProvider } from './context/AuthContext.jsx'
import { TransactionContextProvider } from './context/TransactionContext.jsx'
import App from './App.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContextProvider>
      <TransactionContextProvider>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </TransactionContextProvider>
    </AuthContextProvider>
  </StrictMode>
)
