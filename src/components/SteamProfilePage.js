import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import GameCard from './GameCard';

const SteamProfilePage = () => {
    const [searchInput, setSearchInput] = useState('');
    const [profile, setProfile] = useState(null);
    const [tempProfile, setTempProfile] = useState(null);
    const [topGames, setTopGames] = useState([]);
    const [recentGames, setRecentGames] = useState([]);
    const [tempTopGames, setTempTopGames] = useState([]);
    const [tempRecentGames, setTempRecentGames] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const STEAM_API_KEY = '995A5E9621564B8B91C5914ABCEC519F';
    const navigate = useNavigate();

    const handleSearch = async () => {
        setLoading(true);
        setError(null);
        setProfile(null);
        setTopGames([]);
        setRecentGames([]);
        setTempProfile(null);
        setTempTopGames([]);
        setTempRecentGames([]);

        try {
            const url = new URL(searchInput);
            const pathParts = url.pathname.split('/').filter(Boolean);
            let resolvedId = '';

            if (url.hostname.includes('steamcommunity.com')) {
                if (pathParts[0] === 'profiles') {
                    resolvedId = pathParts[1];
                } else if (pathParts[0] === 'id') {
                    const resolveRes = await axios.get(
                        `https://api.allorigins.win/raw?url=${encodeURIComponent(
                            `https://api.steampowered.com/ISteamUser/ResolveVanityURL/v1/?key=${STEAM_API_KEY}&vanityurl=${pathParts[1]}`
                        )}`
                    );
                    const responseData = resolveRes.data;
                    if (responseData?.response?.success === 1 && responseData.response.steamid) {
                        resolvedId = responseData.response.steamid;
                    } else {
                        throw new Error('Pseudo Steam introuvable. Vérifie l’URL.');
                    }
                } else {
                    throw new Error('URL Steam invalide.');
                }
            } else {
                throw new Error('Veuillez entrer une URL Steam valide.');
            }

            const summaryRes = await axios.get(
                `https://api.allorigins.win/raw?url=${encodeURIComponent(
                    `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=${STEAM_API_KEY}&steamids=${resolvedId}`
                )}`
            );
            const players = summaryRes.data.response.players;
            if (!players.length) throw new Error('Aucun joueur trouvé pour cet ID.');
            const fetchedProfile = players[0];
            setTempProfile(fetchedProfile);
            setTimeout(() => setProfile(fetchedProfile), 2000);

            const gamesRes = await axios.get(
                `https://api.allorigins.win/raw?url=${encodeURIComponent(
                    `https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key=${STEAM_API_KEY}&steamid=${resolvedId}&include_appinfo=true&include_played_free_games=true`
                )}`
            );
            const games = gamesRes.data.response?.games || [];
            const sorted = games
                .filter((g) => g.playtime_forever > 0)
                .sort((a, b) => b.playtime_forever - a.playtime_forever)
                .slice(0, 15); // ⬅️ Limite à 15 jeux
            setTempTopGames(sorted);
            setTimeout(() => setTopGames(sorted), 2000);

            const recentRes = await axios.get(
                `https://api.allorigins.win/raw?url=${encodeURIComponent(
                    `https://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v1/?key=${STEAM_API_KEY}&steamid=${resolvedId}`
                )}`
            );
            const fetchedRecent = (recentRes.data.response?.games || []).slice(0, 15);
            setTempRecentGames(fetchedRecent);
            setTimeout(() => setRecentGames(fetchedRecent), 2000);
        } catch (err) {
            console.error(err);
            setError(err.message || 'Erreur lors de la récupération des données.');
        } finally {
            setLoading(false);
        }
    };

    const handleGameClick = (gameName) => {
        navigate(`/info/${encodeURIComponent(gameName)}`);
    };

    const getScrollDuration = (count) => `${Math.max(10, count * 3)}s`; // ⬅️ 3s par jeu min 10s

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white p-6 transition-all duration-300">
            <h2 className="text-4xl font-extrabold mb-10 text-center animate-slide-up">🎮 Recherche de profil Steam</h2>

            <div className="flex justify-center space-x-4 mb-10 animate-fade-in">
                <input
                    type="text"
                    placeholder="Collez une URL Steam complète"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    className="p-3 rounded-lg text-black w-1/2 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
                <button
                    onClick={handleSearch}
                    className="bg-blue-600 hover:bg-blue-700 transition px-6 py-3 rounded-lg shadow-lg font-semibold"
                >
                    Rechercher
                </button>
            </div>

            {loading && <p className="text-center text-lg animate-pulse">Chargement des données...</p>}
            {error && <p className="text-center text-red-500 text-lg">{error}</p>}

            {tempProfile && !profile && (
                <p className="text-center text-blue-300 text-lg animate-pulse">
                    Préparation du profil de {tempProfile.personaname}...
                </p>
            )}

            {profile && (
                <div className="text-center mb-16 animate-fade-in-slow">
                    <h3 className="text-5xl font-extrabold mb-4 animate-zoom-in">{profile.personaname}</h3>
                    <img
                        src={profile.avatarfull}
                        alt="Avatar"
                        className="w-48 h-48 rounded-full mx-auto mt-2 border-4 border-blue-500 shadow-xl transition-transform hover:scale-110 animate-fade-in-long"
                    />
                </div>
            )}

            <h3 className="text-5xl text-center mb-4 animate-slide-right">🔥 Jeux les plus joués</h3>
            {topGames.length > 0 ? (
                <div className="overflow-hidden w-full">
                    <div
                        className="flex space-x-6 scroll-x w-max"
                        style={{ animationDuration: getScrollDuration(topGames.length) }}
                    >
                        {[...topGames, ...topGames].map((game, index) => (
                            <div key={`${game.appid}-${index}`} onClick={() => handleGameClick(game.name)}>
                                <GameCard game={game} />
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <p className="text-5xl text-center font-bold text-red-600 italic mt-4">
                    ❌ Aucun jeu visible ou ce profil ne permet pas l’accès aux jeux les plus joués.
                </p>
            )}

            <h3 className="text-5xl text-center mt-10 mb-4 animate-slide-left">🕘 Jeux récemment joués</h3>
            {recentGames.length > 0 ? (
                <div className="overflow-hidden w-full">
                    <div
                        className="flex space-x-6 scroll-x w-max"
                        style={{ animationDuration: getScrollDuration(recentGames.length) }}
                    >
                        {[...recentGames, ...recentGames].map((game, index) => (
                            <div key={`${game.appid}-${index}`} onClick={() => handleGameClick(game.name)}>
                                <GameCard game={game} />
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <p className="text-5xl text-center font-bold text-red-600 italic mt-4">
                    ❌ Aucun jeu récent visible ou ce profil ne permet pas l’accès aux jeux récemment joués.
                </p>
            )}
        </div>
    );
};

export default SteamProfilePage;
