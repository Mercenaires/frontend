import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/images/logo.png';
import heroImage from '../assets/images/hero-image.png';

function LandingPage() {
  const [showButtons, setShowButtons] = useState(false);
  const [showFeatures, setShowFeatures] = useState(false);
  const [showAbout, setShowAbout] = useState(false);

  // Gestion du défilement pour afficher les sections
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;

      if (scrollPosition > 200) setShowButtons(true);
      if (scrollPosition > 700) setShowFeatures(true);
      if (scrollPosition > 1200) setShowAbout(true);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-gray-900 text-white relative overflow-hidden">
      {/* Header */}
      <header className="flex justify-between items-center p-6 bg-black">
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="w-12 h-12 mr-2" />
          <h1 className="text-2xl font-bold">MBTInGames</h1>
        </div>
      </header>

      {/* Hero Section avec blob animé */}
      <section className="relative min-h-screen flex items-center px-10 bg-black overflow-hidden">
        {/* Animated Blob */}
        <div className="h-[300px] w-[300px] bg-gradient-to-r from-blue-400 to-pink-500 rounded-full absolute top-10 left-10 blur-3xl animated-wrapper"></div>

        <div className="relative z-10 w-1/2">
          {/* Texte à gauche */}
          <h2 className="text-5xl font-extrabold mb-4">
            Êtes-vous prêt à trouver votre <span className="text-blue-400">jeu</span>{' '}
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-transparent bg-clip-text">
              selon votre MBTI sur notre plateforme ?
            </span>
          </h2>
          <p className="text-xl mt-4">Recommandations de jeux basées sur votre profil MBTI</p>
        </div>

        {/* Image du héros à droite */}
        <div className="relative z-10 w-1/2 flex justify-end">
          <img src={heroImage} alt="Hero" className="w-full max-w-sm object-cover" />
        </div>
      </section>

      {/* Section des Boutons */}
      {showButtons && (
        <section className="py-16 flex justify-center items-center animate-fade-in">
          <div className="space-x-4">
            <Link to="/search">
              <button className="primary-btn">Rechercher un jeu</button>
            </Link>
            <Link to="/mbti">
              <button className="primary-btn">Découvrir votre profil MBTI</button>
            </Link>
          </div>
        </section>
      )}

      {/* Features Section */}
      <section className={`h-[60vh] bg-gray-800 py-16 ${showFeatures ? 'animate-fade-in' : 'opacity-0'}`}>
        <h2 className="text-3xl font-semibold text-center">Fonctionnalités</h2>
        <p className="mt-4 text-center mx-auto max-w-3xl">
          Découvrez les différentes fonctionnalités de notre plateforme qui vous aide à trouver des jeux adaptés à votre profil MBTI.
        </p>
      </section>

      {/* About Section */}
      <section id="about" className={`h-[60vh] bg-gray-900 py-16 ${showAbout ? 'animate-fade-in' : 'opacity-0'}`}>
        <h2 className="text-3xl font-semibold text-center">À propos de nous</h2>
        <p className="mt-4 text-center mx-auto max-w-3xl">
          MBTInGames est une plateforme dédiée à vous proposer des recommandations de jeux vidéo basées sur votre personnalité. En utilisant le modèle MBTI, nous trouvons les jeux qui correspondent le mieux à vos préférences et styles de jeu.
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

