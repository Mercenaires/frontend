import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Papa from 'papaparse';
import csvFilePath from '../assets/data/games_mbti.csv';

function MBTIPage() {
    const [groupedGames, setGroupedGames] = useState({});
    const [filteredGames, setFilteredGames] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetch(csvFilePath)
            .then((response) => response.text())
            .then((text) => {
                const parsedData = Papa.parse(text, { header: true }).data;

                // Regrouper les jeux par type MBTI
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
            });
    }, []);

    // Mettre à jour les résultats de recherche
    const handleSearch = (event) => {
        const term = event.target.value.toLowerCase();
        setSearchTerm(term);

        // Filtrer les jeux par le terme de recherche
        const filtered = Object.entries(groupedGames).flatMap(([type, games]) =>
            games
                .filter((game) => game.toLowerCase().includes(term))
                .map((game) => ({ game, type }))
        );

        setFilteredGames(filtered);
    };

    return (
        <div data-theme="night" className="min-h-screen bg-gray-900 text-white p-6">
            <h2 className="text-3xl font-bold mb-8">Recommandations de jeux par profil MBTI</h2>

            {/* Barre de recherche */}
            <div className="mb-8">
                <input
                    type="text"
                    placeholder="Recherchez un jeu"
                    value={searchTerm}
                    onChange={handleSearch}
                    className="input input-bordered w-full max-w-md bg-gray-800 text-white placeholder-gray-400"
                />
            </div>

            {/* Résultats de recherche */}
            {searchTerm && (
                <div className="mb-8">
                    <h3 className="text-2xl font-semibold mb-4">Résultats de recherche</h3>
                    {filteredGames.length > 0 ? (
                        <ul className="list-disc ml-8">
                            {filteredGames.map((result, index) => (
                                <li key={index}>
                                    <strong>{result.game}</strong> - {result.type}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>Aucun jeu trouvé pour "{searchTerm}"</p>
                    )}
                </div>
            )}

            {/* Liste des jeux par type MBTI */}
            <div>
                {Object.entries(groupedGames).map(([type, games]) => (
                    <div key={type} className="mb-6">
                        <h3 className="text-2xl font-semibold mb-2">{type}</h3>
                        <ul className="list-disc ml-8">
                            {games.map((game, index) => (
                                <li key={index}>
                                    <Link
                                        to={`/info/${encodeURIComponent(game)}`}
                                        className="text-primary underline"
                                    >
                                        {game}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MBTIPage;
