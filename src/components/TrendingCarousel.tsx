import React from "react";
import Slider from "react-slick";

// Typdefinition för en film
interface Movie {
  id: number;
  title: string;
  poster: string;
}

// Mockade filmer (ersätt med riktiga data från API)
const trendingMovies: Movie[] = [
  { id: 1, title: "Movie 1", poster: "https://via.placeholder.com/150" },
  { id: 2, title: "Movie 2", poster: "https://via.placeholder.com/150" },
  { id: 3, title: "Movie 3", poster: "https://via.placeholder.com/150" },
  { id: 4, title: "Movie 4", poster: "https://via.placeholder.com/150" },
  { id: 5, title: "Movie 5", poster: "https://via.placeholder.com/150" },
];

const TrendingCarousel: React.FC = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768, // Mobilanpassning
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="trending-carousel p-4">
      <h2 className="text-2xl font-bold mb-4">Trending Movies</h2>
      <Slider {...settings}>
        {trendingMovies.map((movie) => (
          <div key={movie.id} className="p-2">
            <img
              src={movie.poster}
              alt={movie.title}
              className="w-full h-auto"
            />
            <h3 className="text-center mt-2">{movie.title}</h3>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default TrendingCarousel;
