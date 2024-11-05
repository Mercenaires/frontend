import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import csvFilePath from '../assets/data/games_mbti.csv';

function MBTIPage() {
  const [mbtiType, setMbtiType] = useState('');
  const [gameRecommendations, setGameRecommendations] = useState([]);

  useEffect(() => {
    fetch(csvFilePath)
      .then((response) => response.text())
      .then((text) => {
        const parsedData = Papa.parse(text, { header: true }).data;
        setGameRecommendations(parsedData);
      });
  }, []);

  const getRecommendations = () => {
    return gameRecommendations.filter(
      (game) => game['Type MBTI'] === mbtiType
    );
  };

  const handleSearch = () => {
    const recommendations = getRecommendations();
    setGameRecommendations(recommendations);
  };

  return (
    <div data-theme="night" className="min-h-screen bg-gray-900 text-white p-6">
      <h2 className="text-3xl font-bold mb-8">Recommandations de jeux par profil MBTI</h2>
      
      <div className="mb-8">
        <input
          type="text"
          placeholder="Entrez votre type MBTI (ex: INFP)"
          value={mbtiType}
          onChange={(e) => setMbtiType(e.target.value.toUpperCase())}
          className="input input-bordered input-primary w-full max-w-xs"
        />
        <button onClick={handleSearch} className="btn btn-primary mt-4">
          Rechercher des jeux
        </button>
      </div>

      <h3 className="text-2xl font-semibold mb-4">Jeux recommandés pour le type {mbtiType}</h3>
      <ul className="list-disc ml-8">
        {gameRecommendations.map((game, index) => (
          <li key={index}>
            <strong>{game['Nom du jeu']}</strong> - {game['Type MBTI']}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MBTIPage;


