import React from "react";
import MovieCard from "../components/MovieCard";
import { useBookmarks } from "../context/BookmarksContext";
import "../styles/BookMarkedStyles.css";

const BookMarkedScreen: React.FC = () => {
  const { bookmarks } = useBookmarks();

  if (bookmarks.length === 0) {
    return <p>Du har inga bokmärkta filmer.</p>;
  }

  return (
    <div className="bookmarked-screen">
      <h2 className="bookmarked-title">Dina bokmärkta filmer</h2>
      <div className="bookmarked-movies-grid">
        {bookmarks.map((movie, index) => (
          <MovieCard
            key={index}
            title={movie.title}
            thumbnail={movie.thumbnail}
            synopsis={movie.synopsis}
            rating={movie.rating}
            genre={movie.genre}
            year={movie.year}
            actors={movie.actors}
          />
        ))}
      </div>
    </div>
  );
};

export default BookMarkedScreen;
