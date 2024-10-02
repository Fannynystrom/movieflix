import React from "react";
import MovieCard from "./MovieCard";
import { Movie } from "../types/Movies";

interface MovieListProps {
  movies: Movie[];
}

const MovieList: React.FC<MovieListProps> = ({ movies }) => {
  return (
    <div className="movie-list">
      {movies.map((movie, index) => (
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
  );
};

export default MovieList;
