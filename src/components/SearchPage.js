import React, { useState } from 'react';
import axios from 'axios';

function SearchPage() {
  const [videos, setVideos] = useState([]);
  const [streamers, setStreamers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [reviews, setReviews] = useState([]);

  const fetchYouTubeVideos = async (query) => {
    const apiKey = 'AIzaSyC1frLjEwsv07rwB2bYMXErop9qQXNxVYc'; // Remplacez par votre clé API YouTube
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}+official+trailer&type=video&maxResults=3&key=${apiKey}`;

    try {
      const response = await axios.get(url);
      const videosData = response.data.items.map(item => ({
        title: item.snippet.title,
        url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
      }));
      setVideos(videosData);
    } catch (error) {
      console.error('Erreur lors de la récupération des vidéos YouTube:', error);
    }
  };

  const fetchTwitchStreamers = async (query) => {
    const clientId = '12aymxqcybfb5wssp1muqnqnzd6g1o'; // Remplacez par votre client ID Twitch
    const accessToken = 'wvrqzatragmt5c00ei70yrhbt3r5et'; // Remplacez par votre access token Twitch
    const url = `https://api.twitch.tv/helix/streams?game_name=${encodeURIComponent(query)}&first=3`; // Encode le nom du jeu pour éviter des erreurs

    try {
      // Effectuer la requête API
      const response = await axios.get(url, {
        headers: {
          'Client-ID': clientId,
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      // Vérification de la réponse
      console.log(response.data);

      // Si aucun streamer n'est trouvé pour ce jeu, afficher un message dans la console
      if (response.data.data.length === 0) {
        console.log("Aucun streamer en direct n'a été trouvé pour ce jeu.");
      }

      // Filtrer les streamers qui jouent au jeu recherché et trier par nombre de viewers
      const filteredAndSortedStreamers = response.data.data
          .sort((a, b) => b.viewer_count - a.viewer_count) // Trier par nombre de viewers
          .map(item => ({
            name: item.user_name,
            viewers: item.viewer_count,
            url: `https://www.twitch.tv/${item.user_name}`,
          }));

      // Mettre à jour l'état des streamers
      setStreamers(filteredAndSortedStreamers);

    } catch (error) {
      console.error('Erreur lors de la récupération des streamers Twitch:', error);
    }
  };

  const fetchGameReviews = async (query) => {
    // Remplacez par la logique pour récupérer les critiques de jeu
    const mockReviews = [
      { site: "Metacritic", score: 85 },
      { site: "JV.com", score: 80 }
    ];
    setReviews(mockReviews);
  };

  const handleSearch = () => {
    fetchYouTubeVideos(searchTerm);
    fetchTwitchStreamers(searchTerm);
    fetchGameReviews(searchTerm);
  };

  return (
      <div data-theme="night" className="min-h-screen bg-gray-900 text-white p-6">
        <h2 className="text-3xl font-bold mb-8">Recherche de jeu</h2>

        {/* Barre de recherche */}
        <div className="mb-8">
          <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Recherchez un jeu..."
              className="p-2 rounded-md text-black"
          />
          <button
              onClick={handleSearch}
              className="ml-4 p-2 bg-primary text-white rounded-md"
          >
            Rechercher
          </button>
        </div>

        {/* Vidéos YouTube */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold">Vidéos YouTube</h3>
          <ul className="list-disc ml-8 mt-4">
            {videos.map((video, index) => (
                <li key={index}>
                  <a href={video.url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                    {video.title}
                  </a>
                </li>
            ))}
          </ul>
        </div>

        {/* Streamers Twitch */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold">Streamers Twitch en direct</h3>
          <ul className="list-disc ml-8 mt-4">
            {streamers.map((streamer, index) => (
                <li key={index}>
                  <a href={streamer.url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                    {streamer.name} ({streamer.viewers} spectateurs)
                  </a>
                </li>
            ))}
          </ul>
        </div>

        {/* Notes des jeux */}
        <div>
          <h3 className="text-2xl font-semibold">Notes des jeux</h3>
          <ul className="list-disc ml-8 mt-4">
            {reviews.map((review, index) => (
                <li key={index}>
                  {review.site}: {review.score}%
                </li>
            ))}
          </ul>
        </div>
      </div>
  );
}

export default SearchPage;
