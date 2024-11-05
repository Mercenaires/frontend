// LandingPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/main.css';

function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      
      {/* Banner */}
      <section className="bg-black py-16 text-center">
        <header>
          <h2 className="text-5xl font-extrabold mb-4">Bienvenue sur notre site</h2>
          <p className="text-xl">Recommandations de jeux basées sur votre profil MBTI</p>
        </header>
        <div className="mt-8 space-x-4">
          <Link to="/search">
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
              Rechercher un jeu
            </button>
          </Link>
          <Link to="/mbti">
            <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
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
          Mercenaires est une plateforme dédiée à vous proposer des recommandations de jeux vidéo basées sur votre personnalité. En utilisant le modèle MBTI, nous trouvons les jeux qui correspondent le mieux à vos préférences et styles de jeu.
        </p>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 p-6 text-center text-gray-400">
        <p>&copy; Mercenaires. Design inspiré par <a href="https://html5up.net" className="text-blue-400 hover:text-blue-500">HTML5 UP</a>.</p>
      </footer>
    </div>
  );
}

export default LandingPage;


