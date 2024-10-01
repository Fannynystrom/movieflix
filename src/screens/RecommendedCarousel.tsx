import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import MovieCard from "../components/MovieCard";
import { Movie } from "../types/Movies";
import "../styles/slider.css";

interface RecommendedCarouselProps {
  movies: Movie[];
}

const RecommendedCarousel: React.FC<RecommendedCarouselProps> = ({ movies }) => {
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

export default RecommendedCarousel;
