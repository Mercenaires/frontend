import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/main.css'; // Assure-toi que le chemin est correct

function LandingPage() {
  return (
    <div id="page-wrapper">
      {/* Header */}
      <header id="header">
        <h1><a href="/">Mercenaires</a></h1>
        <nav id="nav">
          <ul>
            <li><a href="#about">À propos</a></li>
            <li><a href="#features">Fonctionnalités</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
      </header>

      {/* Banner */}
      <section id="banner">
        <header>
          <h2>Bienvenue sur notre site</h2>
          <p>Recommandations de jeux basées sur votre profil MBTI</p>
        </header>
        <Link to="/search">
          <button style={{ marginTop: '20px', padding: '10px 20px', fontSize: '16px' }}>
            Rechercher un jeu
          </button>
        </Link>
      </section>

      {/* About Section */}
      <section id="about" className="container">
        <header>
          <h2>À propos de nous</h2>
        </header>
        <p>
          Mercenaires est une plateforme dédiée à vous proposer des recommandations de jeux vidéo basées sur votre personnalité. En utilisant le modèle MBTI, nous trouvons les jeux qui correspondent le mieux à vos préférences et styles de jeu.
        </p>
      </section>

      {/* Footer */}
      <footer id="footer">
        <ul className="copyright">
          <li>&copy; Mercenaires. Design : <a href="https://html5up.net">HTML5 UP</a>.</li>
        </ul>
      </footer>
    </div>
  );
}

export default LandingPage;
