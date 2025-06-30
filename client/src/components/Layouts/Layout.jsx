import Header from './Header.jsx';
import Footer from './Footer.jsx';

const Layout = ({children}) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header/>
      <main className="flex-1 min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200 py-8">
        {children}
      </main>
      <Footer/>
    </div>
  )
}

export default Layout