import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import MovieCard from "../components/MovieCard";
import { Movie } from "../types/Movies";
import "../styles/MovieFlixStyles.css"; // Använd denna CSS-fil

interface TrendingCarouselProps {
  movies: Movie[];
}

const TrendingCarousel: React.FC<TrendingCarouselProps> = ({ movies }) => {
  return (
    <div className="carousel-container">
     <Swiper
  modules={[Navigation, Pagination, A11y]}
  spaceBetween={10}
  slidesPerView={4} // Standardvärde för desktop
  navigation
  pagination={{ clickable: true }}
  breakpoints={{
    480: { slidesPerView: 3 }, // Visa 3 slides per vy på mobiler
    768: { slidesPerView: 4 }, // Visa 4 slides per vy på tablets
    // Lägg till fler breakpoints vid behov
  }}
>

        {movies.map((movie, index) => (
          <SwiperSlide key={index}>
            <MovieCard {...movie} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TrendingCarousel;
