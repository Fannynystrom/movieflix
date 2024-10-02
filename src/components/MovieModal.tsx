import React from "react";
import { FaHeart, FaBookmark, FaPlay } from "react-icons/fa";
import { useBookmarks } from "../context/BookmarksContext";
import "../styles/MovieModal.css";
import { Movie } from "../types/Movies";

interface MovieModalProps {
  movie: Movie;
  onClose: () => void;
}

const MovieModal: React.FC<MovieModalProps> = ({ movie, onClose }) => {
  const { addBookmark, isBookmarked, removeBookmark } = useBookmarks();

  const handleBookmarkClick = () => {
    if (isBookmarked(movie.title)) {
      removeBookmark(movie.title);
    } else {
      addBookmark(movie);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="movie-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <img src={movie.thumbnail} alt={movie.title} />
        <div className="modal-content">
          <h2>{movie.title}</h2>
          <p>
            <strong>Age Rating:</strong> {movie.rating}
          </p>
          <p>
            <strong>Genre:</strong> {movie.genre}
          </p>
          <p>
            <strong>Year:</strong> {movie.year}
          </p>
          <p>
            <strong>Actors:</strong> {movie.actors.join(", ")}
          </p>
          <p>{movie.synopsis}</p>
        </div>

        {/* Ikonerna under bilden */}
        <div className="movie-modal-actions">
          <button className="heart-button">
            <FaHeart size={24} />
          </button>
          <button className="play-button">
            <FaPlay size={24} />
          </button>
          <button className="bookmark-button" onClick={handleBookmarkClick}>
            <FaBookmark
              size={24}
              color={isBookmarked(movie.title) ? "#ffcc00" : "#e0e0e0"}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;
