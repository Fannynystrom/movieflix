import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest"; // Använd vitest för tester
import TrendingCarousel from "../components/TrendingCarousel";
import { Movie } from "../types/Movies";
import { BookmarksProvider } from "../context/BookmarksContext";

// Skapa mockdata för att simulera filmer
const mockMovies: Movie[] = [
  {
    title: "Movie 1",
    genre: "Action",
    rating: "5",
    synopsis: "An action-packed movie.",
    thumbnail: "link/to/thumbnail1.jpg",
    year: 2021,
    actors: ["Actor 1", "Actor 2"],
  },
  {
    title: "Movie 2",
    genre: "Comedy",
    rating: "4",
    synopsis: "A funny movie.",
    thumbnail: "link/to/thumbnail2.jpg",
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

// Definiera testsviten för TrendingCarousel
describe("TrendingCarousel", () => {
  // Test 1: Kontrollera att rätt antal slides renderas
  it("should render the correct number of slides", () => {
    const mockOnMovieSelect = vi.fn(); // Mockfunktion för onMovieSelect

    render(
      <BookmarksProvider>
        <TrendingCarousel
          movies={mockMovies}
          onMovieSelect={mockOnMovieSelect}
        />
      </BookmarksProvider>,
    );

    const slides = screen.getAllByRole("listitem"); // Hämta alla slides som har rollen "listitem"
    expect(slides.length).toBe(mockMovies.length); // Kontrollera att antalet slides matchar antalet filmer
  });

  // Test 2: Kontrollera att filmtitlarna renderas i varje slide
  it("should render movie details in each slide", () => {
    const mockOnMovieSelect = vi.fn(); // Mockfunktion för onMovieSelect

    render(
      <BookmarksProvider>
        <TrendingCarousel
          movies={mockMovies}
          onMovieSelect={mockOnMovieSelect}
        />
      </BookmarksProvider>,
    );

    // Kontrollera att filmtitlar visas
    expect(screen.getByText("Movie 1")).toBeInTheDocument();
    expect(screen.getByText("Movie 2")).toBeInTheDocument();
    expect(screen.getByText("Movie 3")).toBeInTheDocument();
  });

  // Test 3: Kontrollera att 3 slides visas i mobilvy
  it("should show 3 slides on mobile view", () => {
    const mockOnMovieSelect = vi.fn(); // Mockfunktion för onMovieSelect

    // Mocka fönsterstorleken för mobilvy
    Object.defineProperty(window, "innerWidth", {
      configurable: true,
      value: 480,
    });
    window.dispatchEvent(new Event("resize")); // Trigga resize-händelsen

    render(
      <BookmarksProvider>
        <TrendingCarousel
          movies={mockMovies}
          onMovieSelect={mockOnMovieSelect}
        />
      </BookmarksProvider>,
    );

    const slides = screen.getAllByRole("listitem");
    expect(slides.length).toBeLessThanOrEqual(3); // Kontrollera att högst 3 slides visas
  });
});
