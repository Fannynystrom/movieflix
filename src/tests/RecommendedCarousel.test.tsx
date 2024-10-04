import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import RecommendedCarousel from "../components/RecommendedCarousel";
import { Movie } from "../types/Movies";
import { BookmarksProvider } from "../context/BookmarksContext";

// Mockdata för filmer
const mockMovies: Movie[] = [
  {
    title: "Test Movie 1",
    thumbnail: "test-thumbnail-1.jpg",
    synopsis: "This is a test movie synopsis 1.",
    rating: "5",
    genre: "Action",
    year: 2021,
    actors: ["Actor 1", "Actor 2"],
  },
  {
    title: "Test Movie 2",
    thumbnail: "test-thumbnail-2.jpg",
    synopsis: "This is a test movie synopsis 2.",
    rating: "4",
    genre: "Drama",
    year: 2020,
    actors: ["Actor 3", "Actor 4"],
  },
  {
    title: "Movie 3",
    genre: "Horror",
    rating: "5",
    synopsis: "The definition of paranoia.",
    thumbnail: "link/to/thumbnail3.jpg",
    year: 2020,
    actors: ["Actor 5", "Actor 6"],
  },
];

describe("RecommendedCarousel", () => {
  //test.1
  it("should render movie information correctly", () => {
    const mockOnMovieSelect = () => {}; // Mockfunktion för onMovieSelect

    render(
      <BookmarksProvider>
        <RecommendedCarousel
          movies={mockMovies}
          onMovieSelect={mockOnMovieSelect}
        />
      </BookmarksProvider>,
    );

    // Kontrollera att titlarna visas
    mockMovies.forEach((movie) => {
      expect(screen.getByText(movie.title)).toBeInTheDocument();
    });
  });
  //test.2
  it("should display the correct number of slides", () => {
    const mockOnMovieSelect = () => {};

    render(
      <BookmarksProvider>
        <RecommendedCarousel
          movies={mockMovies}
          onMovieSelect={mockOnMovieSelect}
        />
      </BookmarksProvider>,
    );

    const slides = screen.getAllByRole("listitem");
    expect(slides.length).toBe(mockMovies.length); // Kontrollera att antalet slides matchar antalet filmer
  });
  //test.3
  it("should show 3 slides on mobile view", () => {
    const mockOnMovieSelect = () => {};

    render(
      <BookmarksProvider>
        <RecommendedCarousel
          movies={mockMovies}
          onMovieSelect={mockOnMovieSelect}
        />
      </BookmarksProvider>,
    );

    // Simulera mobilvy
    window.innerWidth = 480; // Sätt till mobilbredd
    window.dispatchEvent(new Event("resize")); // Simulera att fönstret har ändrats

    const slides = screen.getAllByRole("listitem");
    expect(slides.length).toBeLessThanOrEqual(3); // Kontrollera att max 3 slides visas
  });
});
