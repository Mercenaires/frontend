import React, { useState, useEffect } from 'react';
import axios from 'axios';

function SearchPage() {
  const [gameName, setGameName] = useState("");
  const [videos, setVideos] = useState([]);
  const [streamers, setStreamers] = useState([]);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    // Appels des fonctions de recherche (fictives pour l'instant)
    fetchTwitchStreamers();
    fetchGameReviews();
  }, []);

  // Fonction pour rechercher les vidéos YouTube en fonction du nom du jeu
  const handleSearch = () => {
    axios
      .get(`http://localhost:8080/search-videos?gameName=${gameName}`)
      .then((response) => {
        setVideos(response.data);
      })
      .catch((error) => {
        console.error("Erreur lors de la recherche de vidéos:", error);
      });
  };

  // Fonctions fictives pour les appels API
  const fetchTwitchStreamers = async () => {
    // Simule les résultats de Twitch
    const mockStreamers = [
      { name: "Streamer1", url: "https://twitch.tv/streamer1" },
      { name: "Streamer2", url: "https://twitch.tv/streamer2" }
    ];
    setStreamers(mockStreamers);
  };

  const fetchGameReviews = async () => {
    // Simule les résultats de Metacritic et JV.com
    const mockReviews = [
      { site: "Metacritic", score: 85 },
      { site: "JV.com", score: 80 }
    ];
    setReviews(mockReviews);
  };

  return (
    <div>
      <h2>Recherche de jeu</h2>
      
      <div>
        <input 
          type="text" 
          value={gameName} 
          onChange={(e) => setGameName(e.target.value)} 
          placeholder="Entrez le nom d'un jeu" 
        />
        <button onClick={handleSearch}>Rechercher</button>
      </div>

      <h3>Vidéos YouTube</h3>
      <ul>
        {videos.map((video, index) => (
          <li key={index}>
            <a href={video.url} target="_blank" rel="noopener noreferrer">
              {video.title}
            </a>
          </li>
        ))}
      </ul>

      <h3>Streamers Twitch en direct</h3>
      <ul>
        {streamers.map((streamer, index) => (
          <li key={index}>
            <a href={streamer.url} target="_blank" rel="noopener noreferrer">
              {streamer.name}
            </a>
          </li>
        ))}
      </ul>

      <h3>Notes des jeux</h3>
      <ul>
        {reviews.map((review, index) => (
          <li key={index}>
            {review.site}: {review.score}%
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchPage;
