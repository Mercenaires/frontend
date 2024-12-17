import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Papa from 'papaparse';
import csvFilePath from '../assets/data/games_mbti.csv';

function MBTIPage() {
    const [groupedGames, setGroupedGames] = useState({});
    const [filteredGames, setFilteredGames] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [gamesWithImages, setGamesWithImages] = useState([]);

    const RAWG_API_KEY = 'f3b7234c26f64859a127e93224980a8f';
    const RAWG_BASE_URL = 'https://api.rawg.io/api';

    useEffect(() => {
        fetch(csvFilePath)
            .then((response) => response.text())
            .then((text) => {
                const parsedData = Papa.parse(text, { header: true }).data;

                const grouped = parsedData.reduce((acc, game) => {
                    const type = game['Type MBTI'];
                    const gameName = game['Nom du jeu'];

                    if (!acc[type]) {
                        acc[type] = [];
                    }
                    acc[type].push(gameName);
                    return acc;
                }, {});

                setGroupedGames(grouped);

                const allGames = Object.values(grouped).flat();
                fetchGameImages(allGames).then(setGamesWithImages);
            });
    }, []);

    const handleSearch = (event) => {
        const term = event.target.value.toLowerCase();
        setSearchTerm(term);

        const filtered = Object.entries(groupedGames).flatMap(([type, games]) =>
            games
                .filter((game) => game.toLowerCase().includes(term))
                .map((game) => ({ game, type }))
        );

        setFilteredGames(filtered);
    };

    const fetchGameImages = async (games) => {
        const gamesWithImages = await Promise.all(
            games.map(async (game) => {
                const response = await fetch(
                    `${RAWG_BASE_URL}/games?key=${RAWG_API_KEY}&search=${encodeURIComponent(game)}`
                );
                const data = await response.json();
                const image = data.results?.[0]?.background_image || '';
                return { game, image };
            })
        );
        return gamesWithImages;
    };

    return (
        <div className="min-h-screen bg-black dark:bg-white text-white dark:text-black p-6">
            <div className="search-bar mb-8">
                <input
                    type="text"
                    placeholder="Recherchez un jeu"
                    value={searchTerm}
                    onChange={handleSearch}
                    className="w-full p-2 bg-gray-800 dark:bg-gray-300 text-white dark:text-black rounded"
                />
            </div>

            {searchTerm && (
                <div className="mb-8">
                    <h3 className="text-2xl font-semibold mb-4">Résultats de recherche</h3>
                    {filteredGames.length > 0 ? (
                        <div>
                            {filteredGames.map((result, index) => (
                                <div key={index} className="mb-4">
                                    <Link
                                        to={`/info/${encodeURIComponent(result.game)}`}
                                        className="text-blue-500 hover:underline"
                                    >
                                        {result.game}
                                    </Link>
                                    <p>Type : {result.type}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>Aucun jeu trouvé pour "{searchTerm}"</p>
                    )}
                </div>
            )}

            <h2 className="text-3xl font-bold mb-8">Recommandations de jeux par profil MBTI</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                {Object.entries(groupedGames).map(([type, games]) => (
                    <div key={type} className="bg-gray-800 dark:bg-gray-300 p-4 rounded">
                        <h3 className="text-2xl font-semibold text-center mb-4">{type}</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-6">
                            {gamesWithImages
                                .filter((gameData) => games.includes(gameData.game))
                                .map((gameData, index) => (
                                    <div key={index} className="game-card">
                                        <img
                                            src={gameData.image}
                                            alt={gameData.game}
                                            className="game-image-icon"
                                        />
                                        <Link
                                            to={`/info/${encodeURIComponent(gameData.game)}`}
                                            className="game-name"
                                        >
                                            {gameData.game}
                                        </Link>
                                    </div>
                                ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MBTIPage;
