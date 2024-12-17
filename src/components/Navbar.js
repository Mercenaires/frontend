import React, { useState, useEffect } from 'react';
import { BiSolidSun, BiSolidMoon } from "react-icons/bi";
import '../assets/css/main.css';
import logo from "../assets/images/logo.png";

function Navbar() {
  const [theme, setTheme] = useState(() =>
    localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    const root = document.documentElement;

    if (theme === "dark") {
      root.classList.add("light");
      root.classList.remove("dark");
    } else {
      root.classList.add("dark");
      root.classList.remove("light");
    }

    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <nav className={`flex justify-between items-center p-6 shadow-md transition-colors duration-300 ${theme === "dark" ? "bg-black text-white" : "bg-white text-black"}`}>
      {/* Logo et Titre */}
      <div className="flex items-center">
        <img src={logo} alt="Logo" className="w-12 h-12 mr-2" />
        <h1 className="text-2xl font-bold"><a href="/">MBTInGames</a></h1>
      </div>

      {/* Liens de Navigation et Switch Mode */}
      <div className="flex items-center space-x-6">
        {/* Liens de Navigation */}
        <ul className="flex space-x-4">
          <li><a href="#about" className="hover:text-blue-400">À propos</a></li>
          <li><a href="#features" className="hover:text-blue-400">Fonctionnalités</a></li>
          <li><a href="#contact" className="hover:text-blue-400">Contact</a></li>
        </ul>
        {/* Bouton Switch Mode */}
{theme === "dark" ? (
  <BiSolidMoon
    className="text-2xl cursor-pointer text-blue-500"
    onClick={() => setTheme("light")}
  />
) : (
  <BiSolidSun
    className="text-2xl cursor-pointer text-yellow-500"
    onClick={() => setTheme("dark")}
  />
)}

      </div>
    </nav>
  );
}

export default Navbar;
