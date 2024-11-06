import React, { useState } from "react";

function SearchPage() {
  const [gameName, setGameName] = useState("");
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch YouTube videos from the backend API
  const fetchYouTubeVideos = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `http://localhost:8080/api/search-videos?gameName=${encodeURIComponent(
          gameName
        )}`
      );
      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des vidéos.");
      }
      const data = await response.json();
      setVideos(
        data.map((video) => ({ title: video.title, url: video.videoUrl }))
      );
    } catch (error) {
      setError(error.message);
      setVideos([]);
    } finally {
      setLoading(false);
    }
  };

  // Handler for search button click
  const handleSearch = () => {
    if (gameName.trim()) {
      fetchYouTubeVideos();
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h2 className="text-3xl font-bold mb-8 text-center">
        Recherche de jeu YouTube
      </h2>

      <div className="mb-8 flex justify-center">
        <input
          type="text"
          placeholder="Entrez le nom du jeu"
          value={gameName}
          onChange={(e) => setGameName(e.target.value)}
          className="p-2 text-black rounded-l w-1/3"
        />
        <button
          onClick={handleSearch}
          className="p-2 bg-primary text-white rounded-r"
        >
          Rechercher
        </button>
      </div>

      {/* Status messages */}
      {loading && <p className="text-center mb-4">Chargement des vidéos...</p>}
      {error && <p className="text-center text-red-500 mb-4">{error}</p>}
      {!loading && !error && videos.length === 0 && (
        <p className="text-center mb-4">Aucune vidéo trouvée.</p>
      )}

      {/* YouTube Videos Section */}
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
