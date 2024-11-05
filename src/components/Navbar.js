// components/NavBar.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/main.css';
import logo from "../assets/images/logo.png";

function Navbar() {
    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <img src={logo} alt="Logo" className="w-12 h-12 mr-2"/>
                <h1 className="text-2xl font-bold">MBTInGames</h1>
            </div>
            <ul className="navbar-links">
                <li><a href="#about">À propos</a></li>
                <li><a href="#features">Fonctionnalités</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
        </nav>
    );
}

export default Navbar;
