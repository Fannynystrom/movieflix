import React from "react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import MovieCard from "../components/MovieCard";
import useFetchMovies from "../hooks/FetchMovies"; // Importera din hook
import "../styles/slider.css";
import "../styles/MovieCard.css";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const TrendingCarousel: React.FC = () => {
  // Använd din hook för att hämta filmer
  const { movies, loading, error } = useFetchMovies();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading movies: {error}</p>;

  return (
    <div className="carousel-container">
      <h2 className="text-2xl font-bold mb-4">Trending Movies</h2>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={50}
        slidesPerView={3}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
      >
        {movies.map((movie) => (
          <SwiperSlide>
            <MovieCard
              title={movie.title}
              thumbnail={movie.thumbnail} // Använd standardbild om thumbnail är undefined
              synopsis={movie.synopsis || "Description not available"}
              rating={movie.rating}
              genre={movie.genre}
              year={movie.year}
              actors={movie.actors || []} // Om ingen actor är tillgänglig, sätt till en tom array
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TrendingCarousel;
