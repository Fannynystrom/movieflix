import React from 'react';
import MovieCard from '../components/MovieCard';
import { useBookmarks } from '../context/BookmarksContext';

const BookMarkedScreen: React.FC = () => {
  const { bookmarks } = useBookmarks();

  if (bookmarks.length === 0) {
    return <p>Du har inga bokmärkta filmer.</p>;
  }

  return (
    <div className="bookmarked-movies">
      <h2>Dina Bokmärkta Filmer</h2>
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

export default BookMarkedScreen;
