import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/images/logo.png';
import '../assets/css/main.css';

function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="flex justify-between items-center p-6 bg-black">
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="w-12 h-12 mr-2" />
          <h1 className="text-2xl font-bold">MBTInGames</h1>
        </div>
      </header>

      {/* Banner */}
      <section className="bg-black py-16 text-center">
        <header>
          <h2 className="text-5xl font-extrabold mb-4">
            Êtes-vous prêt à trouver votre <span className="text-blue-400">jeu</span>{' '}
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-transparent bg-clip-text">
              selon votre MBTI sur notre plateforme ?
            </span>
          </h2>
          <p className="text-xl mb-8">Recommandations de jeux basées sur votre profil MBTI</p>
        </header>
        
        {/* Buttons */}
        <div className="mt-8 space-x-4">
          <Link to="/search">
            <button className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 hover:from-blue-500 hover:via-purple-600 hover:to-pink-600 text-white font-bold py-2 px-4 rounded">
              Rechercher un jeu
            </button>
          </Link>
          <Link to="/mbti">
            <button className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 hover:from-blue-500 hover:via-purple-600 hover:to-pink-600 text-white font-bold py-2 px-4 rounded">
              Découvrir votre profil MBTI
            </button>
          </Link>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="container mx-auto py-16 px-6">
        <header>
          <h2 className="text-3xl font-semibold">À propos de nous</h2>
        </header>
        <p className="mt-4">
          Mercenaires est une plateforme dédiée à vous proposer des recommandations de jeux vidéo
          basées sur votre personnalité. En utilisant le modèle MBTI, nous trouvons les jeux qui
          correspondent le mieux à vos préférences et styles de jeu.
        </p>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 p-6 text-center text-gray-400">
        <p>&copy; MBTInGames. Design inspiré par <a href="https://html5up.net" className="text-blue-400 hover:text-blue-500">HTML5 UP</a>.</p>
      </footer>
    </div>
  );
}

export default LandingPage;
