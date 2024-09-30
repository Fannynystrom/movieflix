import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper/modules";
import useFetchMovies from "../hooks/FetchMovies";
import MovieCard from "../components/MovieCard";
import "../styles/MovieCard.css"; // Justera sökvägen om det behövs
import "../styles/CategoriesStyles.css";
import "../styles/slider.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const CategoriesScreen: React.FC = () => {
  const { movies, loading, error } = useFetchMovies();
  const [selectedCategory, setSelectedCategory] =
    useState<string>("Alla kategorier");

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading movies: {error}</p>;

  const genres = Array.from(
    new Set(
      movies.flatMap((movie) => movie.genre.split(", ").map((g) => g.trim())),
    ),
  );

  return (
    <div className="categories-container">
      {/* Kategoriknappar */}
      <div className="category-buttons">
        <button
          className={`category-button ${selectedCategory === "Alla kategorier" ? "active" : ""}`}
          onClick={() => setSelectedCategory("Alla kategorier")}
        >
          Alla kategorier
        </button>
        {genres.map((genre) => (
          <button
            key={genre}
            className={`category-button ${selectedCategory === genre ? "active" : ""}`}
            onClick={() => setSelectedCategory(genre)}
          >
            {genre}
          </button>
        ))}
      </div>

      {/* Visa filmer när en kategori är vald */}
      {selectedCategory !== "Alla kategorier" ? (
        <div>
          <h2 className="selected-category-title">{selectedCategory}</h2>
          <div className="filtered-movies-grid">
            {movies
              .filter((movie) =>
                movie.genre.split(", ").includes(selectedCategory),
              )
              .map((movie) => (
                <MovieCard
                  key={movie.title}
                  title={movie.title}
                  thumbnail={movie.thumbnail || "path/to/default-image.jpg"}
                  synopsis={movie.synopsis || "Description not available"}
                  rating={movie.rating}
                  genre={movie.genre}
                  year={movie.year}
                  actors={movie.actors || []}
                />
              ))}
          </div>
        </div>
      ) : (
        genres.map((genre) => {
          const genreMovies = movies.filter((movie) =>
            movie.genre.split(", ").includes(genre),
          );
          if (genreMovies.length === 0) return null;
          return (
            <div key={genre} className="category-section">
              <h3 className="category-title">{genre}</h3>
              <Swiper
                modules={[Navigation, Pagination, A11y]}
                spaceBetween={10} // Minska avståndet mellan korten
                slidesPerView={2} // Visa två kort per rad
                navigation
                pagination={{ clickable: true }}
                breakpoints={{
                  480: { slidesPerView: 2, spaceBetween: 10 }, // Justera för mobil
                  768: { slidesPerView: 3, spaceBetween: 20 }, // Justera för tablet
                  1024: { slidesPerView: 4, spaceBetween: 30 }, // Standard för desktop
                }}
              >
                {genreMovies.map((movie) => (
                  <SwiperSlide key={movie.title}>
                    <MovieCard
                      title={movie.title}
                      thumbnail={movie.thumbnail || "path/to/default-image.jpg"}
                      synopsis={movie.synopsis || "Description not available"}
                      rating={movie.rating}
                      genre={movie.genre}
                      year={movie.year}
                      actors={movie.actors || []}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          );
        })
      )}
    </div>
  );
};

export default CategoriesScreen;
