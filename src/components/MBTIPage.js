import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import csvFilePath from '../assets/data/games_mbti.csv';

function MBTIPage() {
    const [mbtiType, setMbtiType] = useState('');
    const [groupedGames, setGroupedGames] = useState({});
    const [originalGroupedGames, setOriginalGroupedGames] = useState({}); // Store original data for reset

    useEffect(() => {
        fetch(csvFilePath)
            .then((response) => response.text())
            .then((text) => {
                try {
                    const parsedData = Papa.parse(text, { header: true }).data;
                    const grouped = groupGamesByMBTI(parsedData);
                    setGroupedGames(grouped);
                    setOriginalGroupedGames(grouped);
                } catch (error) {
                    console.error("Error parsing CSV data:", error);
                }
            })
            .catch(error => console.error("Error fetching CSV file:", error));

    }, []);

    // Helper function to group games by MBTI type
    const groupGamesByMBTI = (games) => {
        return games.reduce((acc, game) => {
            const type = game['Type MBTI'];
            if (!acc[type]) {
                acc[type] = [];
            }
            acc[type].push(game['Nom du jeu']);
            return acc;
        }, {});
    };

    const handleSearch = () => {
        if (mbtiType) {
            // Use the original data to filter
            const filtered = { [mbtiType]: originalGroupedGames[mbtiType] || [] };
            setGroupedGames(filtered);
        } else {
            // Reset to show all games if no MBTI type is entered
            setGroupedGames(originalGroupedGames);
        }
    };

    return (
        <div data-theme="night" className="min-h-screen bg-gray-900 text-white p-6">
            <h2 className="text-3xl font-bold mb-8">Recommandations de jeux par profil MBTI</h2>

            <div className="mb-8">
                <input
                    type="text"
                    placeholder="Entrez votre type MBTI (ex: INFP)"
                    value={mbtiType}
                    onChange={(e) => setMbtiType(e.target.value.toUpperCase())}
                    className="input input-bordered input-primary w-full max-w-xs"
                />
                <button onClick={handleSearch} className="btn btn-primary mt-4">
                    Rechercher des jeux
                </button>
            </div>
            <h1 className="text-2xl font-semibold">Type MBTI :</h1>
            {Object.keys(groupedGames).length > 0 ? (
                Object.keys(groupedGames).map((type) => (
                    <div key={type} className="mb-6">
                        <h3 className="text-2xl font-semibold">{`${type}`}</h3>
                        <ul className="list-disc ml-8 mt-2">
                            {groupedGames[type].map((game, index) => (
                                <li key={index}>{game}</li>
                            ))}
                        </ul>
                    </div>
                ))
            ) : (
                <p>Aucun jeu trouvé pour le type MBTI spécifié.</p>
            )}
        </div>
    );
}

export default MBTIPage;
