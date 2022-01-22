import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './Containers/Home';
import Addquestion from './Containers/Addquestion';
import QuizArea from './Containers/QuizArea';
import SignUp from './Containers/SignUp';
import SignIn from './Containers/SignIn';
import Profile from './Containers/Profile';
import QuizFinal from './Containers/QuizFinal';

const App = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/adddetails" element={<Addquestion />} />
    <Route path="/quiz/:quizid" element={<QuizArea />} />
    <Route path="/quizfinal/:quizid" element={<QuizFinal />} />
    <Route path="/profile/:userid" element={<Profile />} />
    <Route path="/signup" element={<SignUp />} />
    <Route path="/login" element={<SignIn />} />
  </Routes>
);

export default App;
