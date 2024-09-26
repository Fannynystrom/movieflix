import React, { useState } from "react";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import { useBookmarks } from "../context/BookmarksContext";
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

const MovieCard: React.FC<MovieCardProps> = (props) => {
  const [showDetails, setShowDetails] = useState(false);
  const { addBookmark, removeBookmark, isBookmarked } = useBookmarks();

  const handleBookmarkClick = () => {
    if (isBookmarked(props.title)) {
      removeBookmark(props.title);
    } else {
      addBookmark(props);
    }
  };

  return (
    <div className="movie-card">
      <img
        src={props.thumbnail}
        alt={props.title}
        className="movie-card-img"
        onError={(e) => {
          (e.target as HTMLImageElement).src = "path/to/fallback-image.jpg";
        }}
      />
      <div className="movie-card-content">
        <h3 className="movie-card-title">{props.title}</h3>

        <div className="movie-card-actions">
          <button className="like-button">❤️ Like</button>
          <button className="play-button">▶️ Play</button>

          {/* Bokmärkesknappen */}
          <button className="bookmark-button" onClick={handleBookmarkClick}>
            {isBookmarked(props.title) ? <FaBookmark /> : <FaRegBookmark />}
          </button>
        </div>

        <button
          className="dropdown-button"
          onClick={() => setShowDetails(!showDetails)}
        >
          {showDetails ? "▲ Less Info" : "▼ More Info"}
        </button>

        {showDetails && (
          <div className="movie-card-details">
            <p>{props.synopsis}</p>
            <p>Rating: {props.rating}</p>
            <p>Genre: {props.genre}</p>
            <p>Year: {props.year}</p>
            <p>Actors: {props.actors.join(", ")}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieCard;
