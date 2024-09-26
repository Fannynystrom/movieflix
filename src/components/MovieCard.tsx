import React, { useState } from "react";
import "../styles/MovieCard.css";

interface MovieCardProps {
  title: string;
  thumbnail: string;
  synopsis: string;
  rating: string;
  genre: string;
  year: number;
  actors: string[];
}

const MovieCard: React.FC<MovieCardProps> = ({
  title,
  thumbnail,
  synopsis,
  rating,
  genre,
  year,
  actors,
}) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="movie-card">
      <img
        src={thumbnail}
        alt={title}
        className="movie-card-img"
        onError={(e) => {
          (e.target as HTMLImageElement).src = "path/to/fallback-image.jpg"; // Fallback bild
        }}
      />
      <div className="movie-card-content">
        <h3 className="movie-card-title">{title}</h3>

        <div className="movie-card-actions">
          <button className="like-button">❤️ Like</button>
          <button className="play-button">▶️ Play</button>
          <button className="add-button">➕ Add</button>
        </div>

        <button
          className="dropdown-button"
          onClick={() => setShowDetails(!showDetails)}
        >
          {showDetails ? "▲ Less Info" : "▼ More Info"}
        </button>

        {showDetails && (
          <div className="movie-card-details">
            <p>{synopsis}</p>
            <p>Rating: {rating}</p>
            <p>Genre: {genre}</p>
            <p>Year: {year}</p>
            <p>Actors: {actors.join(", ")}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieCard;
