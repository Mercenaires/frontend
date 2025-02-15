import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaCalendarWeek, FaCalendarDay, FaStar } from "react-icons/fa"; // Import des icônes
import { Link } from "react-router-dom"; // Import du Link

function ReleasePage() {
    const [gamesThisWeek, setGamesThisWeek] = useState([]);
    const [gamesLastWeek, setGamesLastWeek] = useState([]);
    const [gamesLast30Days, setGamesLast30Days] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const API_KEY = "f3b7234c26f64859a127e93224980a8f";
    const RAWG_BASE_URL = "https://api.rawg.io/api";

    useEffect(() => {
        const fetchGames = async () => {
            setLoading(true);
            setError(null);
            try {
                const today = new Date();
                const thirtyDaysAgo = new Date();
                thirtyDaysAgo.setDate(today.getDate() - 30);

                const formatDate = (date) => date.toISOString().split("T")[0];

                const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay() + 1));
                const endOfWeek = new Date(startOfWeek);
                endOfWeek.setDate(startOfWeek.getDate() + 6);

                const startOfLastWeek = new Date(startOfWeek);
                startOfLastWeek.setDate(startOfWeek.getDate() - 7);
                const endOfLastWeek = new Date(startOfLastWeek);
                endOfLastWeek.setDate(startOfLastWeek.getDate() + 6);

                const [thisWeekResponse, lastWeekResponse, last30DaysResponse] = await Promise.all([
                    axios.get(`${RAWG_BASE_URL}/games`, {
                        params: {
                            key: API_KEY,
                            dates: `${formatDate(startOfWeek)},${formatDate(endOfWeek)}`,
                            ordering: "-added",
                            page_size: 5,
                        },
                    }),
                    axios.get(`${RAWG_BASE_URL}/games`, {
                        params: {
                            key: API_KEY,
                            dates: `${formatDate(startOfLastWeek)},${formatDate(endOfLastWeek)}`,
                            ordering: "-added",
                            page_size: 5,
                        },
                    }),
                    axios.get(`${RAWG_BASE_URL}/games`, {
                        params: {
                            key: API_KEY,
                            dates: `${formatDate(thirtyDaysAgo)},${formatDate(new Date())}`,
                            ordering: "-added",
                            page_size: 5,
                        },
                    }),
                ]);

                setGamesThisWeek(thisWeekResponse.data.results);
                setGamesLastWeek(lastWeekResponse.data.results);
                setGamesLast30Days(last30DaysResponse.data.results);
            } catch (err) {
                setError("Erreur lors de la récupération des jeux.");
            } finally {
                setLoading(false);
            }
        };

        fetchGames();
    }, []);

    if (loading) return <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">Chargement...</div>;
    if (error) return <div className="min-h-screen flex items-center justify-center bg-gray-900 text-red-500">{error}</div>;

    const GameCard = ({ game }) => (
        <Link to={`/info/${encodeURIComponent(game.name)}`}>
            <div className="group relative bg-gray-800 p-4 rounded-lg shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105">
                <img
                    src={game.background_image}
                    alt={game.name}
                    className="w-full h-48 object-cover rounded-lg mb-4 group-hover:opacity-80 transition duration-300"
                />
                <h3 className="text-lg font-bold text-white">{game.name}</h3>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-300 flex flex-col justify-end items-start p-4 text-white">
                    <p className="text-sm">
                        <strong>Date de sortie :</strong> {game.released}
                    </p>
                    <p className="text-sm">
                        <strong>Genres :</strong> {game.genres.map((genre) => genre.name).join(", ")}
                    </p>
                </div>
            </div>
        </Link>
    );

    return (
        <div className="min-h-screen bg-gray-900 text-white p-6">
            <h1 className="text-4xl font-bold mb-12 text-center text-gradient bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
                Nouveaux jeux et tendances
            </h1>

            <section className="mb-12">
                <div className="flex items-center mb-6">
                    <FaCalendarWeek className="text-blue-400 text-3xl mr-3" />
                    <h2 className="text-3xl font-semibold border-b border-gray-700 pb-2">Cette semaine</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {gamesThisWeek.map((game) => (
                        <GameCard key={game.id} game={game} />
                    ))}
                </div>
            </section>

            <section className="mb-12">
                <div className="flex items-center mb-6">
                    <FaCalendarDay className="text-green-400 text-3xl mr-3" />
                    <h2 className="text-3xl font-semibold border-b border-gray-700 pb-2">La semaine dernière</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {gamesLastWeek.map((game) => (
                        <GameCard key={game.id} game={game} />
                    ))}
                </div>
            </section>

            <section>
                <div className="flex items-center mb-6">
                    <FaStar className="text-yellow-400 text-3xl mr-3" />
                    <h2 className="text-3xl font-semibold border-b border-gray-700 pb-2">Les 30 derniers jours</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {gamesLast30Days.map((game) => (
                        <GameCard key={game.id} game={game} />
                    ))}
                </div>
            </section>
        </div>
    );
}

export default ReleasePage;
