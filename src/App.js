import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import RecherchePage from "./components/RecherchePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/recherche" element={<RecherchePage />} />
      </Routes>
    </Router>
  );
}

export default App;
