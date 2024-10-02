import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y } from 'swiper/modules';
import MovieCard from '../components/MovieCard';
import { Movie } from '../types/Movies';
import '../styles/slider.css';

interface RecommendedCarouselProps {
  movies: Movie[];
  onMovieSelect: (movie: Movie) => void;
}

const RecommendedCarousel: React.FC<RecommendedCarouselProps> = ({ movies, onMovieSelect }) => {
  return (
    <div className="carousel-container">
      <Swiper
  modules={[Navigation, Pagination, A11y]}
  spaceBetween={10}
  slidesPerView={3}  
  navigation
  pagination={{ clickable: true }}
  breakpoints={{
    320: {
      slidesPerView: 2,   // Endast 1 kort per vy för små skärmar (mobiler)
      spaceBetween: 10,
    },
    480: {
      slidesPerView: 2,   // Visa 2 kort per vy för lite större skärmar
      spaceBetween: 10,
    },
    768: {
      slidesPerView: 3,   // Visa 3 kort per vy på surfplattor
      spaceBetween: 20,
    },
    1024: {
      slidesPerView: 4,   // För desktop, 4 kort per vy
      spaceBetween: 30,
    },
  }}
>

        {movies.map((movie) => (
          <SwiperSlide key={movie.title}>
            <MovieCard
              {...movie}
              onClick={() => onMovieSelect(movie)}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default RecommendedCarousel;
