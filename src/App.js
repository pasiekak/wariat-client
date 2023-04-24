import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/navbar'
import './styles/App.css'

function App() {

  return (
    <div className='App'>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" />
          <Route path="/about" />
          <Route path="/cart" />
        </Routes>
      </Router>
    </div>
  );
}

export default App