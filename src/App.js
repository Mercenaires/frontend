import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import SearchPage from './components/SearchPage';
import MBTIPage from './components/MBTIPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/mbti" element={<MBTIPage />} />
      </Routes>
    </Router>
  );
}

export default App;
