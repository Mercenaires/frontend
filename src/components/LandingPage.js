import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/images/logo.png';
import heroImage from '../assets/images/hero-image.png';
import marioImage from '../assets/images/mario-image.png';

function LandingPage() {
  const [showButtons, setShowButtons] = useState(false);
  const [showFeatures, setShowFeatures] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Gestion du défilement pour afficher ou masquer les sections avec animation
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;

      if (scrollPosition > lastScrollY) {
        // Scrolling down
        if (scrollPosition > 600) setShowButtons(true);
        if (scrollPosition > 1100) setShowFeatures(true);
        if (scrollPosition > 1500) setShowAbout(true);
      } else {
        // Scrolling up
        if (scrollPosition < 600) setShowButtons(false);
        if (scrollPosition < 1100) setShowFeatures(false);
        if (scrollPosition < 1500) setShowAbout(false);
      }

      setLastScrollY(scrollPosition);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <div className="bg-black dark:bg-white relative overflow-hidden">
      {/* Hero Section avec blob animé */}
      <section className="relative min-h-screen flex items-center px-10 bg-black dark:bg-white overflow-hidden">
        {/* Animated Blob */}
        <div className="h-[300px] w-[300px] bg-gradient-to-r from-blue-400 to-pink-500 rounded-full absolute top-0 left-0 blur-3xl animated-wrapper"></div>

        <div className="relative z-10 w-1/2">
          {/* Texte à gauche */}
          <h2 className="text-5xl font-extrabold mb-4 text-white dark:text-black">
            Êtes-vous prêt à trouver votre{' '}
            <span className="text-blue-400">jeu</span>{' '}
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-transparent bg-clip-text">
              selon votre MBTI sur notre plateforme ?
            </span>
          </h2>
          <p className="text-xl mt-4 text-white dark:text-black">
            Recommandations de jeux basées sur votre profil MBTI
          </p>
        </div>

        {/* Image du héros à droite */}
        <div className="relative z-10 w-1/2 flex justify-end">
          <img src={heroImage} alt="Hero" className="w-full max-w-sm object-cover animate-fade-in" />
        </div>
      </section>

      {/* Section des Boutons avec Mario image et blob centré */}
      <section
        className={`relative py-16 flex justify-between items-center bg-black dark:bg-white ${
          showButtons ? 'animate-fade-in' : 'animate-fade-out'
        }`}
      >
        <div className="w-1/3 flex justify-start pl-10 animate-fade-in">
          <img src={marioImage} alt="Mario" className="w-full max-w-xs object-cover" />
        </div>

        <div className="h-[250px] w-[250px] bg-gradient-to-r from-blue-400 to-pink-500 rounded-full blur-3xl absolute inset-0 m-auto animated-wrapper"></div>

        <div className="relative z-10 flex flex-col items-center w-1/3 space-y-4">
          <Link to="/search">
            <button className="primary-btn">Rechercher un jeu</button>
          </Link>
          <Link to="/mbti">
            <button className="primary-btn">Découvrir votre profil MBTI</button>
          </Link>
          <Link to="/mbtitest">
  <button className="primary-btn">Passer le test MBTI</button>
</Link>

        </div>
      </section>

      {/* Features Section réduite */}
      <section
        className={`h-[40vh] py-8 bg-black dark:bg-white ${
          showFeatures ? 'animate-fade-in' : 'animate-fade-out'
        }`}
      >
        <h2 className="text-3xl font-semibold text-center text-white dark:text-black">Fonctionnalités</h2>
        <p className="mt-4 text-center mx-auto max-w-3xl text-white dark:text-black">
          Découvrez les différentes fonctionnalités de notre plateforme qui vous aide à trouver des jeux adaptés à
          votre profil MBTI.
        </p>
      </section>

      {/* About Section réduite */}
      <section
        id="about"
        className={`h-[40vh] py-8 bg-black dark:bg-white ${
          showAbout ? 'animate-fade-in' : 'animate-fade-out'
        }`}
      >
        <h2 className="text-3xl font-semibold text-center text-white dark:text-black">À propos de nous</h2>
        <p className="mt-4 text-center mx-auto max-w-3xl text-white dark:text-black">
          MBTInGames est une plateforme dédiée à vous proposer des recommandations de jeux vidéo basées sur votre
          personnalité. En utilisant le modèle MBTI, nous trouvons les jeux qui correspondent le mieux à vos
          préférences et styles de jeu.
        </p>
      </section>

      {/* Footer */}
      <footer className="bg-black dark:bg-white p-6 text-center text-gray-400 dark:text-gray-600">
        <p>
          &copy; MBTInGames. Design inspiré par{' '}
          <a href="https://html5up.net" className="text-blue-400 hover:text-blue-500">
            HTML5 UP
          </a>
          .
        </p>
      </footer>
    </div>
  );
}

export default LandingPage;
