// components/NavBar.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/main.css';

function Navbar() {
    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <h1 class="text-4xl font-bold"><a href="/">MBTInGames</a></h1>
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
