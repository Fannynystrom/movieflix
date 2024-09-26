import React from "react";
import MovieCard from "./MovieCard";
import useFetchMovies from "../hooks/FetchMovies";

const MovieList: React.FC = () => {
  const { movies, loading, error } = useFetchMovies();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="movie-list">
      {movies.map((movie, index) => (
        <MovieCard
          key={index} // Använd index här eller ett unikt ID om du har ett
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
  );
};

export default MovieList;
