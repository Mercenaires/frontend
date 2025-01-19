import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import SearchPage from './components/SearchPage';
import Navbar from './components/Navbar';
import MBTIPage from './components/MBTIPage';
import CatMBTIGamePage from "./components/CatMBTIGamePage";
import GameInfo from "./components/GameInfo";
import ReleasePage from './components/ReleasePage';


function App() {
  return (
    <Router>
        <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/mbti" element={<MBTIPage />} />
          <Route path="/catmbtigame" element={<CatMBTIGamePage />} />
          <Route path="/info/:gameName" element={<GameInfo />} />
          <Route path="/release" element={<ReleasePage />} />
      </Routes>
    </Router>
  );
}

export default App;
