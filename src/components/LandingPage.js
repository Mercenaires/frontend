import React from "react";
import { Link } from "react-router-dom"; // Assurez-vous que react-router-dom est installé

function LandingPage() {
  return (
    <div id="page-wrapper">
      {/* Reste de la structure de LandingPage */}

      <section id="banner">
        <header>
          <h2>Bienvenue sur notre site</h2>
          <p>Recommandations de jeux basées sur votre profil MBTI</p>
          <Link to="/recherche" className="button">
            Commencer la recherche de jeux
          </Link>
        </header>
      </section>

      {/* Autres sections */}
    </div>
  );
}

export default LandingPage;
