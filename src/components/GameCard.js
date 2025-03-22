//Permet d'avoir le nom du jeu ainsi que le temps de jeu.

import React from 'react';
import { useNavigate } from 'react-router-dom';

const GameCard = ({ game }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/steam-profile/`, { state: { game } });
    };

    return (
        <div
            onClick={handleClick}
            className="bg-gray-800 w-[450px] h-[350px] animate-fade-in transition-transform hover:scale-105 duration-300 shadow-xl"
        >
            <img
                src={`https://cdn.cloudflare.steamstatic.com/steam/apps/${game.appid}/capsule_616x353.jpg`}
                alt={game.name}
                className="w-full h-50 object-cover rounded mb-2"
            />
            <h3 className="text-xl font-bold text-white truncate">{game.name}</h3>
            <p className="text-base font-bold text-white-400">Temps joué : {(game.playtime_forever / 60).toFixed(1)} h</p>

        </div>
    );
};

export default GameCard;

