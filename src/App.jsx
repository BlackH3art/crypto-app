import './App.css'

// components
import Welcome from './components/Welcome/Welcome';
import Navbar from './components/Navbar/Navbar';
import Services from './components/Services/Services';
import Transactions from './components/Transactions/Transactions';
import Footer from './components/Footer/Footer';

const App = () => {

  return (
    <div className="min-h-screen">
      <div className="gradient-bg-welcome">
        <Navbar />
        <Welcome />
      </div>
      
      <Services />
      <Transactions />
      <Footer />

    </div>
  )
}

export default App
