import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import MovieCard from "../components/MovieCard";
import useFetchMovies from "../hooks/FetchMovies";
import { Movie } from "../types/Movies";
import "../styles/slider.css";

interface RecommendedCarouselProps {
  trendingMovies: Movie[]; // Filmer från TrendingCarousel
}

const RecommendedCarousel: React.FC<RecommendedCarouselProps> = ({
  trendingMovies,
}) => {
  const { movies, loading, error } = useFetchMovies(false); // Ingen slumpning

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading movies: {error}</p>;

  // Filtrera bort filmer som redan visas i TrendingCarousel
  const filteredMovies = movies.filter(
    (movie) =>
      !trendingMovies.some((trending) => trending.title === movie.title),
  );

  const recommendedMovies: Movie[] = filteredMovies.slice(0, 7); // Begränsa till 10 filmer

  return (
    <div className="carousel-container">
      <h2 className="text-2xl font-bold mb-4">Recommended Movies</h2>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={50}
        slidesPerView={3}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
      >
        {recommendedMovies.map((movie, index) => (
          <SwiperSlide key={index}>
            <MovieCard
              title={movie.title}
              thumbnail={movie.thumbnail}
              synopsis={movie.synopsis}
              rating={movie.rating}
              genre={movie.genre}
              year={movie.year}
              actors={movie.actors}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default RecommendedCarousel;
