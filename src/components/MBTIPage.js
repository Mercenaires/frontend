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
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h2 className="text-4xl font-bold mb-8">Recommandations de jeux par profil MBTI</h2>
      
      <input
        type="text"
        placeholder="Entrez votre type MBTI (ex: INFP)"
        value={mbtiType}
        onChange={(e) => setMbtiType(e.target.value.toUpperCase())}
        className="bg-gray-800 text-white p-2 rounded mb-4"
      />
      <button onClick={handleSearch} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded ml-2">
        Rechercher des jeux
      </button>

      <h3 className="text-2xl font-semibold mt-8">Jeux recommandés pour le type {mbtiType}</h3>
      <ul className="space-y-2 mt-4">
        {gameRecommendations.map((game, index) => (
          <li key={index} className="bg-gray-800 p-4 rounded">
            <strong>{game['Nom du jeu']}</strong> - {game['Type MBTI']}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MBTIPage;

