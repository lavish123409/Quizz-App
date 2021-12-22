import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './Containers/Home';
import Addquestion from './Containers/Addquestion';

const App = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/adddetails" element={<Addquestion />} />
  </Routes>
);

export default App;
