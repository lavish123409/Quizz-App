import './App.css';
// import { Route , Switch } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom'; 
import Home from './pages/Home/Home';
import Addquestion from './pages/AddQuestion/Addquestion';

function App() {
  return (
    
      <Routes>
        <Route path="/" element={ <Home/> }/>
        <Route path="/adddetails" element={ <Addquestion/> }/>
      </Routes>
    
  );
}

export default App;
