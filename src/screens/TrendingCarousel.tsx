import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper/modules";
import MovieCard from "../components/MovieCard";
import { Movie } from "../types/Movies";
import "../styles/slider.css";

interface TrendingCarouselProps {
  movies: Movie[];
  onMovieSelect: (movie: Movie) => void; // Keeping onMovieSelect in props
}

const TrendingCarousel: React.FC<TrendingCarouselProps> = ({
  movies,
  onMovieSelect,
}) => {
  return (
    <div className="carousel-container" style={{ position: "relative" }}>
      <Swiper
        modules={[Navigation, Pagination, A11y]}
        spaceBetween={10}
        slidesPerView={3}
        navigation
        pagination={{ clickable: true }}
        breakpoints={{
          320: { slidesPerView: 2, spaceBetween: 10 },
          480: { slidesPerView: 2, spaceBetween: 10 },
          768: { slidesPerView: 3, spaceBetween: 20 },
          1024: { slidesPerView: 4, spaceBetween: 30 },
        }}
      >
        {movies.map((movie, index) => (
          <SwiperSlide key={index} role="listitem">
            <MovieCard
              {...movie}
              onClick={() => onMovieSelect(movie)} // Pass onMovieSelect to MovieCard
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TrendingCarousel;
