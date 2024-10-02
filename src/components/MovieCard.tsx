import React from "react";
import "../styles/MovieCard.css";
import { Movie } from "../types/Movies";
import { FaHeart, FaPlay, FaBookmark, FaRegBookmark } from "react-icons/fa";
import { useBookmarks } from "../context/BookmarksContext";

interface MovieCardProps extends Movie {
  onClick?: () => void;
}

const MovieCard: React.FC<MovieCardProps> = ({
  title,
  thumbnail,
  synopsis,
  rating,
  genre,
  year,
  actors,
  onClick,
}) => {
  const { addBookmark, removeBookmark, isBookmarked } = useBookmarks();

  const isBookmarkedMovie = isBookmarked(title);

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isBookmarkedMovie) {
      removeBookmark(title);
    } else {
      const movie: Movie = {
        title,
        thumbnail,
        synopsis,
        rating,
        genre,
        year,
        actors,
      };
      addBookmark(movie);
    }
  };

  return (
    <div className="movie-card" onClick={onClick}>
      <img src={thumbnail} alt={title} />
      <h3>{title}</h3>

      <div className="movie-info">
        <p>
          <strong>Age Rating:</strong> {rating}
        </p>
        <p>
          <strong>Year:</strong> {year}
        </p>
      </div>

      <div className="movie-card-actions">
        <button className="heart-button">
          <FaHeart />
        </button>
        <button className="play-button">
          <FaPlay />
        </button>
        <button
          className="bookmark-button"
          onClick={handleBookmarkClick}
          aria-label={isBookmarked(title) ? "Remove bookmark" : "Add bookmark"}
        >
          {isBookmarked(title) ? <FaBookmark /> : <FaRegBookmark />}
        </button>
      </div>
    </div>
  );
};

export default MovieCard;
