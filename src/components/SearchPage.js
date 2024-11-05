import React, { useState, useEffect } from 'react';

function SearchPage() {
  const [videos, setVideos] = useState([]);
  const [streamers, setStreamers] = useState([]);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
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
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h2 className="text-4xl font-bold mb-8">Recherche de jeu</h2>

      <h3 className="text-2xl font-semibold mt-6">Vidéos YouTube</h3>
      <ul className="space-y-2 mt-4">
        {videos.map((video, index) => (
          <li key={index} className="bg-gray-800 p-4 rounded-lg">
            <a href={video.url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
              {video.title}
            </a>
          </li>
        ))}
      </ul>

      <h3 className="text-2xl font-semibold mt-8">Streamers Twitch en direct</h3>
      <ul className="space-y-2 mt-4">
        {streamers.map((streamer, index) => (
          <li key={index} className="bg-gray-800 p-4 rounded-lg">
            <a href={streamer.url} target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:underline">
              {streamer.name}
            </a>
          </li>
        ))}
      </ul>

      <h3 className="text-2xl font-semibold mt-8">Notes des jeux</h3>
      <ul className="space-y-2 mt-4">
        {reviews.map((review, index) => (
          <li key={index} className="bg-gray-800 p-4 rounded-lg">
            {review.site}: <span className="text-green-400 font-bold">{review.score}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchPage;

