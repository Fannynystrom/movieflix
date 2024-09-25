import React from "react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import MovieCard from "./MovieCard"; // Importera MovieCard
import thething from "../assets/thething.jpg"; // Importera din standardbild
import "../styles/slider.css"; // Importera slider-stilen
import "../styles/MovieCard.css"; // Importera MovieCard-stilen

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

interface Movie {
  id: number;
  title: string;
  poster?: string;
}

const trendingMovies: Movie[] = [
  { id: 1, title: "Movie 1", poster: "https://via.placeholder.com/150" },
  { id: 2, title: "Movie 2", poster: "https://via.placeholder.com/150" },
  { id: 3, title: "Movie 3", poster: "https://via.placeholder.com/150" },
  { id: 4, title: "Movie 4", poster: "https://via.placeholder.com/150" },
  { id: 5, title: "Movie 5" }, // Ingen bild, kommer att använda default-bild
];

const TrendingCarousel: React.FC = () => {
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
        {trendingMovies.map((movie) => (
          <SwiperSlide key={movie.id}>
            <MovieCard
              title={movie.title}
              imageUrl={thething} // Använd standardbilden om poster är undefined
              description="Description not available"
              ageRating="18"
              duration="100"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TrendingCarousel;
