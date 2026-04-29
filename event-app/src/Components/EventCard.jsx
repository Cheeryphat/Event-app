import React, { useEffect, useState } from 'react';
import { events } from '../data/events';

const EventCard = ({ event }) => {
    const [liked, setLiked] = useState(false);

    
        useEffect(() => {
            const favorites =
                JSON.parse(localStorage.getItem("favorites")) || [];

            setLiked(favorites.includes(event.id));
        }, [event.id]);

    const toggleFavorite = () => {
        let favorites =
            JSON.parse(localStorage.getItem("favorites")) || [];

        if (favorites.includes(event.id)) {
            favorites = favorites.filter((id) => id !== event.id);
            setLiked(false);
        } else {
            favorites.push(event.id);
            setLiked(true);
        }

        localStorage.setItem(
            "favorites",
            JSON.stringify(favorites)
        );
    };

    return (
        <div className="bg-white shadow-lg rounded-2xl p-5 hover:shadow-xl transition">
            <h2 className="text-xl font-bold capitalize">
                {event.title}
            </h2>

            <p className="text-gray-600 mt-2">{event.date}</p>
            <p className="text-gray-500">{event.location}</p>

            <button
                onClick={toggleFavorite}
                className="mt-4"
            >
                {liked ? "❤️ Favorited" : "🤍 Favorite"}
            </button>
        </div>
    );
};

export default EventCard;