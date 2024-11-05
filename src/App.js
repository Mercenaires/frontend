import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import SearchPage from './components/SearchPage';
import CatMBTIGamePage from './components/CatMBTIGamePage';
import Navbar from './components/Navbar';
import MBTIPage from './components/MBTIPage';


function App() {
  return (
    <Router>
        <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/mbti" element={<MBTIPage />} />
          <Route path="/catmbtipage" element={<CatMBTIGamePage />} />
      </Routes>
    </Router>
  );
}

export default App;
