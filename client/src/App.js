import './App.css';
// import { Route , Switch } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom'; 
import Home from './pages/Home/Home';

function App() {
  return (
    
      <Routes>
        <Route path="/" element={ <Home/> }/>
      </Routes>
    
  );
}

export default App;
