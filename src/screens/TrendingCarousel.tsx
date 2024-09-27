// import React from "react";
// import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
// import { Swiper, SwiperSlide } from "swiper/react";
// import MovieCard from "../components/MovieCard";
// import useFetchMovies from "../hooks/FetchMovies"; // Importera din hook
// import "../styles/slider.css";
// import "../styles/MovieCard.css";

// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import "swiper/css/scrollbar";

// const TrendingCarousel: React.FC = () => {
//   const { movies, loading, error } = useFetchMovies(true); // true för slumpmässiga filmer

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error loading movies: {error}</p>;

//   return (
//     <div className="carousel-container">
//       <h2 className="text-2xl font-bold mb-4">Trending Movies</h2>
//       <Swiper
//         modules={[Navigation, Pagination, Scrollbar, A11y]}
//         spaceBetween={50}
//         slidesPerView={3}
//         navigation
//         pagination={{ clickable: true }}
//         scrollbar={{ draggable: true }}
//       >
//         {movies.map((movie, index) => (
//           <SwiperSlide key={index}>
//             <MovieCard
//               title={movie.title}
//               thumbnail={movie.thumbnail}
//               synopsis={movie.synopsis}
//               rating={movie.rating}
//               genre={movie.genre}
//               year={movie.year}
//               actors={movie.actors}
//             />
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </div>
//   );
// };

// export default TrendingCarousel;
// import React from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
// import "swiper/css";
// import MovieCard from "../components/MovieCard";
// import useFetchMovies from "../hooks/FetchMovies";
// import "../styles/slider.css";
// import "../styles/MovieCard.css";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import "swiper/css/scrollbar";

// const TrendingCarousel: React.FC = () => {
//   const { movies, loading, error } = useFetchMovies(true);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error loading movies: {error}</p>;

//   return (
//     <div className="carousel-container">
//       <h2 className="text-2xl font-bold mb-4">Trending Movies</h2>
//       <Swiper
//         modules={[Navigation, Pagination, Scrollbar, A11y]}
//         spaceBetween={50}
//         slidesPerView={5}
//         navigation
//         pagination={{ clickable: true }}
//         scrollbar={{ draggable: true }}
//       >
//         {movies.map((movie, index) => (
//           <SwiperSlide key={index}>
//             <MovieCard
//               title={movie.title}
//               thumbnail={movie.thumbnail}
//               synopsis={movie.synopsis}
//               rating={movie.rating}
//               genre={movie.genre}
//               year={movie.year}
//               actors={movie.actors}
//             />
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </div>
//   );
// };

// export default TrendingCarousel;
// import React from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules"; // Importera Swiper-moduler
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import "swiper/css/scrollbar";
// import MovieCard from "../components/MovieCard"; // Importera MovieCard-komponenten
// import useFetchMovies from "../hooks/FetchMovies"; // Importera din fetch-hook
// import { Movie } from "../types/Movies"; // Importera din Movie-typ
// import "../styles/slider.css"; // Importera stil för Swiper

// const TrendingCarousel: React.FC = () => {
//   const { movies, loading, error } = useFetchMovies(true); // Slumpmässiga filmer från din hook

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error loading movies: {error}</p>;

//   // Begränsa antalet filmer till 10
//   const trendingMovies: Movie[] = movies.slice(0, 7);

//   return (
//     <div className="carousel-container">
//       <h2 className="text-2xl font-bold mb-4">Trending Movies</h2>
//       <Swiper
//         modules={[Navigation, Pagination, Scrollbar, A11y]}
//         spaceBetween={50}
//         slidesPerView={3} // Visa 5 filmer åt gången
//         navigation
//         pagination={{ clickable: true }}
//         scrollbar={{ draggable: true }}
//       >
//         {trendingMovies.map((movie, index) => (
//           <SwiperSlide key={index}>
//             <MovieCard
//               title={movie.title}
//               thumbnail={movie.thumbnail}
//               synopsis={movie.synopsis}
//               rating={movie.rating}
//               genre={movie.genre}
//               year={movie.year}
//               actors={movie.actors}
//             />
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </div>
//   );
// };

// export default TrendingCarousel;
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

const TrendingCarousel: React.FC = () => {
  const { movies, loading, error } = useFetchMovies(true); // Slumpa filmerna

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading movies: {error}</p>;

  const trendingMovies: Movie[] = movies.slice(0, 7); // Begränsa till 10 filmer

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
        {trendingMovies.map((movie, index) => (
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

export default TrendingCarousel;
