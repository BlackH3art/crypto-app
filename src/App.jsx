import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// components
import Welcome from './components/Welcome/Welcome';
import Navbar from './components/Navbar/Navbar';
import Services from './components/Services/Services';
import Transactions from './components/Transactions/Transactions';
import Footer from './components/Footer/Footer';
import Ico from './components/IcoComponent/Ico';


const App = () => {

  return (
    <Router>
      <div className="min-h-screen">
        <div className="gradient-bg-welcome">
          <Navbar />

          <Routes>
            <Route exact path="/" element={<Welcome />}/>

            <Route exact path="/ico" element={<Ico />} />
              
          </Routes>
          {/* <Welcome /> */}
        </div>
        
        <Services />
        <Transactions />
        <Footer />

      </div>
    </Router>
  )
}

export default App
