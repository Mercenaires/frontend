import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function GameInfo() {
    const { gameName } = useParams();
    const navigate = useNavigate();
    const [gameDetails, setGameDetails] = useState(null);
    const [youtubeVideos, setYoutubeVideos] = useState([]);
    const [error, setError] = useState(null);
    const [showFullDescription, setShowFullDescription] = useState(false);

    const rawgApiKey = 'f3b7234c26f64859a127e93224980a8f';

    useEffect(() => {
        const fetchGameDetails = async () => {
            try {
                if (!gameName) {
                    throw new Error("Aucun nom de jeu n'a été fourni.");
                }

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

                const detailsResponse = await axios.get(`https://api.rawg.io/api/games/${gameId}`, {
                    params: {
                        key: rawgApiKey
                    }
                });

                const gameData = detailsResponse.data;

                const youtubeResponse = await axios.get('https://www.googleapis.com/youtube/v3/search', {
                    params: {
                        part: 'snippet',
                        type: 'video',
                        maxResults: 2,
                        q: `${gameName} trailer`,
                        key: 'AIzaSyC1frLjEwsv07rwB2bYMXErop9qQXNxVYc',
                    }
                });

                if (!youtubeResponse.data.items || youtubeResponse.data.items.length === 0) {
                    throw new Error('Aucune vidéo trouvée sur YouTube.');
                }

                setYoutubeVideos(youtubeResponse.data.items);
                setGameDetails(gameData);
            } catch (err) {
                console.error('Erreur complète :', err);
                setError(`Erreur lors de la récupération des données : ${err.message}`);
            }
        };

        fetchGameDetails();
    }, [gameName, rawgApiKey]);

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-900 dark:bg-gray-100 text-white dark:text-black">
                Erreur : {error}
            </div>
        );
    }

    if (!gameDetails) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-900 dark:bg-gray-100 text-white dark:text-black">
                Chargement des informations du jeu...
            </div>
        );
    }

    const platforms = gameDetails.platforms.map(p => p.platform.name).join(', ');

    const truncatedDescription = gameDetails.description
        ? gameDetails.description.slice(0, 300)
        : '';

    return (
        <div
            className="min-h-screen bg-cover bg-center bg-no-repeat p-8"
            style={{
                backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.9)), url(${gameDetails.background_image})`,
                backgroundSize: 'cover',
                backgroundAttachment: 'fixed',
            }}
        >
            <button
                className="back-button bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg shadow-md mb-6"
                onClick={() => navigate(-1)}
            >
                Retour
            </button>

            <div className="text-center mb-8">
                <h1 className="game-title text-5xl font-bold mb-4">{gameDetails.name}</h1>
                {gameDetails.background_image && (
                    <img
                        src={gameDetails.background_image}
                        alt={gameDetails.name}
                        className="game-image mx-auto mb-6 rounded-lg shadow-lg max-h-96 object-cover"
                    />
                )}
            </div>

            <div className="max-w-4xl mx-auto bg-gray-800 dark:bg-gray-100 text-white dark:text-black p-6 rounded-lg shadow-lg">
                <h2 className="section-title text-3xl font-semibold mb-4 text-blue-400">
                    Description du jeu
                </h2>
                <div
                    className="game-description mb-4 p-4 bg-gray-900 dark:bg-gray-200 text-justify rounded-lg shadow-inner overflow-hidden"
                    style={{
                        border: '1px solid #4a90e2',
                        maxHeight: showFullDescription ? 'none' : '200px',
                        overflow: showFullDescription ? 'visible' : 'hidden',
                        transition: 'max-height 0.3s ease-in-out',
                    }}
                    dangerouslySetInnerHTML={{
                        __html: showFullDescription
                            ? gameDetails.description
                            : `${truncatedDescription}...`
                    }}
                ></div>
                <div className="text-center">
                    {!showFullDescription ? (
                        <button
                            className="text-blue-500 hover:text-blue-700 underline font-semibold"
                            onClick={() => setShowFullDescription(true)}
                        >
                            Voir plus...
                        </button>
                    ) : (
                        <button
                            className="text-blue-500 hover:text-blue-700 underline font-semibold"
                            onClick={() => setShowFullDescription(false)}
                        >
                            Voir moins
                        </button>
                    )}
                </div>
            </div>

            <div className="max-w-4xl mx-auto mt-8">
                <h2 className="section-title text-3xl font-semibold mb-4 text-blue-400">
                    Plateformes disponibles
                </h2>
                <p className="bg-gray-900 dark:bg-gray-200 text-white dark:text-black p-4 rounded-lg shadow-inner">
                    {platforms}
                </p>
            </div>

            <div className="max-w-4xl mx-auto mt-8">
                <h2 className="section-title text-3xl font-semibold mb-4 text-blue-400">
                    Bande d'annonce du jeu
                </h2>
                <ul className="video-list space-y-6">
                    {youtubeVideos.map((video) => (
                        <li key={video.id.videoId} className="video-item mx-auto">
                            <iframe
                                className="w-full rounded-lg shadow-md"
                                width="100%"
                                height="315"
                                src={`https://www.youtube.com/embed/${video.id.videoId}`}
                                title={video.snippet.title}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                            <p className="text-center mt-2 text-sm font-medium">{video.snippet.title}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default GameInfo;
