import React from "react";
import TrendingCarousel from "./TrendingCarousel";
import RecommendedCarousel from "./RecommendedCarousel";
import useFetchMovies from "../hooks/FetchMovies";
import { Movie } from "../types/Movies";
import "../styles/MovieFlixStyles.css";
import "../styles/MovieCard.css";
const shuffleArray = (array: Movie[]) => {
  return array.sort(() => Math.random() - 0.5);
};

const MovieFlixScreen: React.FC = () => {
  const { movies, loading, error } = useFetchMovies();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading movies: {error}</p>;

  // Slumpa filmerna
  const shuffledMovies = shuffleArray([...movies]);

  // Dela upp filmerna utan överlappning
  const trendingMovies = shuffledMovies.slice(0, 7); // Första 7 filmerna för Trending
  const recommendedMovies = shuffledMovies.slice(7, 14);

  return (
    <div className="movieflix-container">
      <section className="trending-section">
        <h2 className="section-title">Trending Movies</h2>
        <TrendingCarousel movies={trendingMovies} />
      </section>
      <section className="recommended-section">
        <h2 className="section-title">Recommended Movies</h2>
        <RecommendedCarousel movies={recommendedMovies} />
      </section>
    </div>
  );
};

export default MovieFlixScreen;
