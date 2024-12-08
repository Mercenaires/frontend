import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import de useNavigate
import axios from 'axios';

function GameInfo() {
    const { gameName } = useParams(); // Récupération du paramètre dynamique
    const navigate = useNavigate(); // Hook pour naviguer entre les pages
    const [gameDetails, setGameDetails] = useState(null);
    const [youtubeVideos, setYoutubeVideos] = useState([]);
    const [error, setError] = useState(null);

    const rawgApiKey = 'f3b7234c26f64859a127e93224980a8f';

    useEffect(() => {
        const fetchGameDetails = async () => {
            try {
                if (!gameName) {
                    throw new Error("Aucun nom de jeu n'a été fourni.");
                }

                // Étape 1 : Rechercher le jeu par nom sur RAWG
                const searchResponse = await axios.get('https://api.rawg.io/api/games', {
                    params: {
                        key: rawgApiKey,
                        search: gameName
                    }
                });

                if (!searchResponse.data.results || searchResponse.data.results.length === 0) {
                    throw new Error('Aucun jeu trouvé sur RAWG.');
                }

                const gameId = searchResponse.data.results[0].id;

                // Étape 2 : Récupérer les détails complets du jeu via son ID
                const detailsResponse = await axios.get(`https://api.rawg.io/api/games/${gameId}`, {
                    params: {
                        key: rawgApiKey
                    }
                });

                const gameData = detailsResponse.data;

                // Étape 3 : Récupérer les vidéos YouTube (inchangé)

                const youtubeResponse = await axios.get(
                    'https://www.googleapis.com/youtube/v3/search',
                    {
                        params: {
                            part: 'snippet',
                            type: 'video',
                            maxResults: 2,
                            q: `${gameName} trailer`,
                            key: 'AIzaSyC1frLjEwsv07rwB2bYMXErop9qQXNxVYc',
                        },
                    }
                );

                if (!youtubeResponse.data.items || youtubeResponse.data.items.length === 0) {
                    throw new Error('Aucune vidéo trouvée sur YouTube.');
                }


                setYoutubeVideos(youtubeResponse.data.items);

                setGameDetails(gameData);
            } catch (err) {
                console.error('Erreur complète :', err);
                if (err.response) {
                    console.error('Données erreur :', err.response.data);
                    console.error('Statut erreur :', err.response.status);
                } else if (err.request) {
                    console.error('Pas de réponse :', err.request);
                } else {
                    console.error('Erreur lors de la configuration :', err.message);
                }
                setError(`Erreur lors de la récupération des vidéos : ${err.response?.data?.error?.message || 'Inconnue.'}`);
            }
        };

        fetchGameDetails();
    }, [gameName, rawgApiKey]);

    if (error) {
        return <div className="error-message">Erreur : {error}</div>;
    }

    if (!gameDetails) {
        return <div className="loading-message">Chargement des informations du jeu...</div>;
    }

    const platforms = gameDetails.platforms || [];

    return (
        <div className="game-info-container">
            {/* Bouton pour revenir à la page précédente */}
            <button className="back-button" onClick={() => navigate(-1)}>
                Retour
            </button>

            <h1 className="game-title">{gameDetails.name}</h1>
            {/* Affichage de l'image du jeu */}
            {gameDetails.background_image && (
                <img
                    src={gameDetails.background_image}
                    alt={gameDetails.name}
                    className="game-image"
                />
            )}
            <p className="game-description">{gameDetails.description_raw || 'Aucune description disponible.'}</p>

            <h2 className="section-title">Configurations système</h2>
            <ul className="platform-list">
                {platforms.map((platformInfo, index) => {
                    const platformName = platformInfo.platform.name || 'Plateforme inconnue';
                    const minimumRequirements = platformInfo.requirements?.minimum || null;
                    const recommendedRequirements = platformInfo.requirements?.recommended || null;

                    if (!minimumRequirements && !recommendedRequirements) {
                        return null;
                    }

                    return (
                        <li key={index} className="platform-item">
                            <h3>{platformName}</h3>
                            {minimumRequirements && <p>Configuration minimale : {minimumRequirements}</p>}
                            {recommendedRequirements && <p>Configuration recommandée : {recommendedRequirements}</p>}
                        </li>
                    );
                })}
            </ul>

            <h2 className="section-title">Vidéos de gameplay</h2>
            <ul className="video-list">
                {youtubeVideos.map((video) => (
                    <li key={video.id.videoId} className="video-item">
                        <iframe
                            width="560"
                            height="315"
                            src={`https://www.youtube.com/embed/${video.id.videoId}`}
                            title={video.snippet.title}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                        <p>{video.snippet.title}</p>
                    </li>
                ))}
            </ul>


        </div>
    );
    /*
    <ul>
                {youtubeVideos.map((video) => (
                    <li key={video.id.videoId}>
                        <a
                            href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {video.snippet.title}
                        </a>
                    </li>
                ))}
            </ul>
     */
}

export default GameInfo;
