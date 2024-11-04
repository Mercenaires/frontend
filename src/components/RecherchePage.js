import React, { useState } from "react";
import axios from "axios";

function RecherchePage() {
  const [gameName, setGameName] = useState("Minecraft");
  const [videos, setVideos] = useState([]);

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

  return (
    <div style={{ color: "white" }}>
      <h1>Recherche de jeux</h1>
      <input
        type="text"
        value={gameName}
        onChange={(e) => setGameName(e.target.value)}
        placeholder="Entrez le nom d'un jeu"
      />
      <button onClick={handleSearch}>Rechercher</button>

      {videos.length > 0 ? (
        <div>
          {videos.map((video, index) => (
            <div key={index} style={{ margin: "20px 0" }}>
              <h3>{video.title}</h3>
              <iframe
                width="560"
                height="315"
                src={`https://www.youtube.com/embed/${
                  video.url.split("v=")[1]
                }`}
                title={video.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          ))}
        </div>
      ) : (
        <p>Aucun résultat pour l'instant. Veuillez effectuer une recherche.</p>
      )}
    </div>
  );
}

export default RecherchePage;
