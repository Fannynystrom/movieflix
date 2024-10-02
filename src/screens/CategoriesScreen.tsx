import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y } from 'swiper/modules';
import useFetchMovies from '../hooks/FetchMovies';
import MovieCard from '../components/MovieCard';
import MovieModal from '../components/MovieModal';
import { Movie } from '../types/Movies';
import '../styles/CategoriesStyles.css';
import '../styles/slider.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const CategoriesScreen: React.FC = () => {
  const { movies, loading, error } = useFetchMovies();
  const [selectedCategory, setSelectedCategory] = useState<string>('Alla kategorier');
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading movies: {error}</p>;

  const genres = Array.from(
    new Set(
      movies.flatMap((movie) => movie.genre.split(', ').map((g) => g.trim())),
    ),
  );

  const handleMovieSelect = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  return (
    <div className="categories-container">
      {/* Category buttons */}
      <div className="category-buttons">
        <button
          className={`category-button ${selectedCategory === 'Alla kategorier' ? 'active' : ''}`}
          onClick={() => setSelectedCategory('Alla kategorier')}
        >
          Alla kategorier
        </button>
        {genres.map((genre) => (
          <button
            key={genre}
            className={`category-button ${selectedCategory === genre ? 'active' : ''}`}
            onClick={() => setSelectedCategory(genre)}
          >
            {genre}
          </button>
        ))}
      </div>

      {/* Display movies based on selected category */}
      {selectedCategory !== 'Alla kategorier' ? (
        <div>
          <h2 className="selected-category-title">{selectedCategory}</h2>
          <div className="filtered-movies-grid">
            {movies
              .filter((movie) => movie.genre.split(', ').includes(selectedCategory))
              .map((movie) => (
                <MovieCard
                  key={movie.title}
                  {...movie}
                  onClick={() => handleMovieSelect(movie)}
                />
              ))}
          </div>
        </div>
      ) : (
        genres.map((genre) => {
          const genreMovies = movies.filter((movie) =>
            movie.genre.split(', ').includes(genre),
          );
          if (genreMovies.length === 0) return null;
          return (
            <div key={genre} className="category-section">
              <h3 className="category-title">{genre}</h3>
              <Swiper
                modules={[Navigation, Pagination, A11y]}
                spaceBetween={10}
                slidesPerView={2}
                navigation
                pagination={{ clickable: true }}
                breakpoints={{
                  480: { slidesPerView: 2, spaceBetween: 10 },
                  768: { slidesPerView: 3, spaceBetween: 20 },
                  1024: { slidesPerView: 4, spaceBetween: 30 },
                }}
              >
                {genreMovies.map((movie) => (
                  <SwiperSlide key={movie.title}>
                    <MovieCard
                      {...movie}
                      onClick={() => handleMovieSelect(movie)}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          );
        })
      )}
      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
      )}
    </div>
  );
};

export default CategoriesScreen;
