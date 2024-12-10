import React, { useState } from "react";
import DarkMode from "./DarkMode";

function SearchPage() {
  const [gameName, setGameName] = useState("");
  const [videos, setVideos] = useState([]);
  const [score, setScore] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchGameInfo = async () => {
    setLoading(true);
    setError(null);
    setScore(null);
    setVideos([]);

    try {
      const scoreResponse = await fetch(
        `http://localhost:8080/api/game-score?gameName=${encodeURIComponent(
          gameName
        )}`
      );
      if (!scoreResponse.ok)
        throw new Error("Erreur lors de la récupération du score.");

      const scoreData = await scoreResponse.json();
      setScore(scoreData.score);

      const videoResponse = await fetch(
        `http://localhost:8080/api/search-videos?gameName=${encodeURIComponent(
          gameName
        )}`
      );
      if (!videoResponse.ok)
        throw new Error("Erreur lors de la récupération des vidéos.");

      const videoData = await videoResponse.json();
      setVideos(
        videoData.map((video) => ({ title: video.title, url: video.videoUrl }))
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (gameName.trim()) fetchGameInfo();
  };

  return (
    <div className="min-h-screen bg-black dark:bg-white text-white dark:text-black p-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold mb-8">Recherche de jeu</h2>
        <DarkMode />
      </div>
      <div className="mb-8 flex justify-center">
        <input
          type="text"
          placeholder="Entrez le nom du jeu"
          value={gameName}
          onChange={(e) => setGameName(e.target.value)}
          className="p-2 text-black bg-gray-200 rounded-l w-1/3"
        />
        <button
          onClick={handleSearch}
          className="p-2 bg-blue-500 text-white rounded-r"
        >
          Rechercher
        </button>
      </div>
      {loading && <p className="text-center mb-4">Chargement...</p>}
      {error && <p className="text-center text-red-500 mb-4">{error}</p>}
      {score !== null && (
        <div className="mb-4 text-center">
          <h3 className="text-xl font-semibold">Score : {score}/5</h3>
        </div>
      )}
      {videos.length > 0 && (
        <div className="mb-8">
          <h3 className="text-2xl font-semibold mb-4 text-center">
            Vidéos YouTube
          </h3>
          <ul className="flex flex-col items-center">
            {videos.map((video, index) => (
              <li key={index} className="mb-8 w-full max-w-lg">
                <iframe
                  src={video.url}
                  title={video.title}
                  width="100%"
                  height="315"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
                <p className="mt-2 text-center">{video.title}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default SearchPage;
