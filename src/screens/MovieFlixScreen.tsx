import React, { useState } from 'react';
import TrendingCarousel from './TrendingCarousel';
import RecommendedCarousel from './RecommendedCarousel';
import useFetchMovies from '../hooks/FetchMovies';
import { Movie } from '../types/Movies';
import MovieModal from '../components/MovieModal';
import '../styles/MovieFlixStyles.css';
import '../styles/slider.css';



const MovieFlixScreen: React.FC = () => {
  const { movies, loading, error } = useFetchMovies();
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading movies: {error}</p>;

  // Slumpa filmerna och dela upp dem utan överlappning
  const shuffledMovies = [...movies].sort(() => Math.random() - 0.5);

  const trendingMoviesCount = Math.min(7, shuffledMovies.length / 2);
  const trendingMovies = shuffledMovies.slice(0, trendingMoviesCount);
  const recommendedMovies = shuffledMovies.slice(trendingMoviesCount, trendingMoviesCount * 2);

  const handleMovieSelect = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  return (
    <div className="movieflix-container">
      <section className="trending-section">
        <h2 className="section-title">Trending Movies</h2>
        <TrendingCarousel movies={trendingMovies} onMovieSelect={handleMovieSelect} />
      </section>
      <section className="recommended-section">
        <h2 className="section-title">Recommended Movies</h2>
        <RecommendedCarousel movies={recommendedMovies} onMovieSelect={handleMovieSelect} />
      </section>
      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
      )}
    </div>
  );
};

export default MovieFlixScreen;
