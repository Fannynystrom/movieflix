import React from 'react';
import MovieCard from '../components/MovieCard';
import { useBookmarks } from '../context/BookmarksContext';

const BookMarked: React.FC = () => {
  const { bookmarks } = useBookmarks();

  if (bookmarks.length === 0) {
    return <p>You have no bookmarked movies.</p>;
  }

  return (
    <div className="bookmarked-movies">
      <h2>Your Bookmarked Movies</h2>
      <div className="movie-list">
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

export default BookMarked;
