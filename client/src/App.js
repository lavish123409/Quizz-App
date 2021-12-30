import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './Containers/Home';
import Addquestion from './Containers/Addquestion';
import Addtitle from './Containers/Addtitle';
import QuizArea from './Containers/QuizArea';

const App = () => (
  <Routes>
    <Route path="/" element={<QuizArea />} />
    <Route path="/adddetails" element={<Addquestion />} />
    <Route path="/addtitle" element={<Addtitle />} />
  </Routes>
);

export default App;
