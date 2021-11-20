import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NewQuestion from './NewQuestion';
import Question from './Question';
import Home from './Home';
import Login from './Login';
import NavBar from './NavBar';
import ErrorPage from './ErrorPage';

import { handleInitialData } from '../actions/shared';

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(handleInitialData());
  }, []);

  return (
    <Router>
      <div className="app-container">
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route exact path="/add" element={<NewQuestion />} />
          <Route exact path="/questions/:questionId" element={<Question />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
    </Router>
  );
}
