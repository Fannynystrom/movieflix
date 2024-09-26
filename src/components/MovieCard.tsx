import React, { useState } from "react";
import "../styles/MovieCard.css"; // Importera CSS-filen

interface MovieCardProps {
  title: string;
  imageUrl: string;
  description: string;
  ageRating: string; // Åldersgräns
  duration: string; // Filmlängd
}

const MovieCard: React.FC<MovieCardProps> = ({
  title,
  imageUrl,
  description,
  ageRating,
  duration,
}) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="movie-card">
      <img src={imageUrl} alt={title} className="movie-card-img" />
      <div className="movie-card-content">
        <h3 className="movie-card-title">{title}</h3>

        {/* Knappar: Like, Play, Lägg till */}
        <div className="movie-card-actions">
          <button className="like-button">❤️ Like</button>
          <button className="play-button">▶️ Play</button>
          <button className="add-button">➕ Add</button>
        </div>

        {/* Dropdown-knapp */}
        <button
          className="dropdown-button"
          onClick={() => setShowDetails(!showDetails)}
        >
          {showDetails ? "▲ Less Info" : "▼ More Info"}
        </button>

        {/* Dropdown-innehåll */}
        {showDetails && (
          <div className="movie-card-details">
            <p className="movie-card-description">{description}</p>
            <p>Age Rating: {ageRating}</p>
            <p>Duration: {duration}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieCard;
