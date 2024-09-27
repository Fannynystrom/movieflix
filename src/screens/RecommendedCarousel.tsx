// import React from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import MovieCard from "../components/MovieCard";
// import useFetchMovies from "../hooks/FetchMovies";
// import { Movie } from "../types/Movies";
// import "../styles/slider.css";
// import "../styles/MovieCard.css";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import "swiper/css/scrollbar";

// interface RecommendedCarouselProps {
//   trendingMovies: Movie[];
// }

// const RecommendedCarousel: React.FC<RecommendedCarouselProps> = ({
//   trendingMovies,
// }) => {
//   const { movies, loading, error } = useFetchMovies(true);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error loading movies: {error}</p>;

//   const filteredMovies = movies.filter(
//     (movie) =>
//       !trendingMovies.some((trending) => trending.title === movie.title),
//   );

//   return (
//     <div className="carousel-container">
//       <h2>Recommended Movies</h2>
//       <Swiper
//         slidesPerView={3}
//         spaceBetween={30}
//         pagination={{ clickable: true }}
//       >
//         {filteredMovies.map((movie, index) => (
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

// // export default RecommendedCarousel;
// import React from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules"; // Lägg till Swiper-moduler
// import MovieCard from "../components/MovieCard";
// import useFetchMovies from "../hooks/FetchMovies";
// import { Movie } from "../types/Movies";
// import "../styles/slider.css";
// import "../styles/MovieCard.css";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import "swiper/css/scrollbar";

// interface RecommendedCarouselProps {
//   trendingMovies: Movie[];
// }

// const RecommendedCarousel: React.FC<RecommendedCarouselProps> = ({
//   trendingMovies,
// }) => {
//   const { movies, loading, error } = useFetchMovies(true);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error loading movies: {error}</p>;

//   // Filtrera bort filmer som visas i TrendingCarousel
//   const filteredMovies = movies.filter(
//     (movie) =>
//       !trendingMovies.some((trending) => trending.title === movie.title),
//   );

//   return (
//     <div className="carousel-container">
//       <h2 className="text-2xl font-bold mb-4">Recommended Movies</h2>
//       <Swiper
//         modules={[Navigation, Pagination, Scrollbar, A11y]} // Lägg till modulerna för navigation och scroll
//         spaceBetween={50}
//         slidesPerView={5} // Visa 5 filmer samtidigt
//         navigation
//         pagination={{ clickable: true }}
//         scrollbar={{ draggable: true }}
//       >
//         {filteredMovies.map((movie, index) => (
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

// // export default RecommendedCarousel;
// import React from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules"; // Importera Swiper-moduler
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import "swiper/css/scrollbar";
// import MovieCard from "../components/MovieCard"; // Importera MovieCard-komponenten
// import useFetchMovies from "../hooks/FetchMovies"; // Importera din fetch-hook
// import { Movie } from "../types/Movies";
// import "../styles/slider.css"; // Importera stil för Swiper

// interface RecommendedCarouselProps {
//   trendingMovies: Movie[]; // Props för att filtrera bort trendande filmer
// }

// const RecommendedCarousel: React.FC<RecommendedCarouselProps> = ({
//   trendingMovies,
// }) => {
//   const { movies, loading, error } = useFetchMovies(true); // Slumpmässiga filmer från din hook

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error loading movies: {error}</p>;

//   // Filtrera bort filmer som redan visas i TrendingCarousel
//   const filteredMovies = movies.filter(
//     (movie) =>
//       !trendingMovies.some((trending) => trending.title === movie.title),
//   );

//   // Begränsa antalet filmer till 10
//   const recommendedMovies: Movie[] = filteredMovies.slice(0, 7);

//   return (
//     <div className="carousel-container">
//       <h2 className="text-2xl font-bold mb-4">Recommended Movies</h2>
//       <Swiper
//         modules={[Navigation, Pagination, Scrollbar, A11y]}
//         spaceBetween={50}
//         slidesPerView={3} // Visa 5 filmer åt gången
//         navigation
//         pagination={{ clickable: true }}
//         scrollbar={{ draggable: true }}
//       >
//         {recommendedMovies.map((movie, index) => (
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

// export default RecommendedCarousel;
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
