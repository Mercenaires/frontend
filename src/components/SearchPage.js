import React, { useState } from "react";

function SearchPage() {
  const [gameName, setGameName] = useState("");
  const [videos, setVideos] = useState([]);

  // Handler for search button click
  const handleSearch = () => {
    if (gameName.trim()) {
      fetchYouTubeVideos();
    }
  };

  // Fetch YouTube videos from the backend API
  const fetchYouTubeVideos = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/search-videos?gameName=${encodeURIComponent(
          gameName
        )}`
      );
      const data = await response.json();
      const formattedVideos = data.map((video) => ({
        title: video.title,
        url: video.videoUrl,
      }));
      setVideos(formattedVideos);
    } catch (error) {
      console.error("Error fetching YouTube videos:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h2 className="text-3xl font-bold mb-8">Recherche de jeu</h2>

      {/* Search Bar and Button */}
      <div className="mb-8">
        <input
          type="text"
          placeholder="Entrez le nom du jeu"
          value={gameName}
          onChange={(e) => setGameName(e.target.value)}
          className="p-2 text-black rounded mr-2"
        />
        <button
          onClick={handleSearch}
          className="p-2 bg-primary text-white rounded"
        >
          Rechercher
        </button>
      </div>

      {/* YouTube Videos Section */}
      <div className="mb-8">
        <h3 className="text-2xl font-semibold">Vidéos YouTube</h3>
        <ul className="list-disc ml-8 mt-4">
          {videos.map((video, index) => (
            <li key={index} className="mb-4">
              <iframe
                src={video.url}
                title={video.title}
                width="560"
                height="315"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              <p>{video.title}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default SearchPage;
