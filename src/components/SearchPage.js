import React, { useState, useEffect } from 'react';

function SearchPage() {
  const [videos, setVideos] = useState([]);
  const [streamers, setStreamers] = useState([]);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    // Appels des fonctions de recherche (fictives pour l'instant)
    fetchYouTubeVideos();
    fetchTwitchStreamers();
    fetchGameReviews();
  }, []);

  const fetchYouTubeVideos = async () => {
    const mockVideos = [
      { title: "Gameplay 1", url: "https://youtube.com/..." },
      { title: "Gameplay 2", url: "https://youtube.com/..." },
      { title: "Gameplay 3", url: "https://youtube.com/..." }
    ];
    setVideos(mockVideos);
  };

  const fetchTwitchStreamers = async () => {
    const mockStreamers = [
      { name: "Streamer1", url: "https://twitch.tv/streamer1" },
      { name: "Streamer2", url: "https://twitch.tv/streamer2" }
    ];
    setStreamers(mockStreamers);
  };

  const fetchGameReviews = async () => {
    const mockReviews = [
      { site: "Metacritic", score: 85 },
      { site: "JV.com", score: 80 }
    ];
    setReviews(mockReviews);
  };

  return (
    <div data-theme="night" className="min-h-screen bg-gray-900 text-white p-6">
      <h2 className="text-3xl font-bold mb-8">Recherche de jeu</h2>

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

      <div className="mb-8">
        <h3 className="text-2xl font-semibold">Streamers Twitch en direct</h3>
        <ul className="list-disc ml-8 mt-4">
          {streamers.map((streamer, index) => (
            <li key={index}>
              <a href={streamer.url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                {streamer.name}
              </a>
            </li>
          ))}
        </ul>
      </div>

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


