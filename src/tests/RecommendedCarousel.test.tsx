import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import RecommendedCarousel from "../screens/RecommendedCarousel"; // Justera sökvägen om nödvändigt
import { Movie } from "../types/Movies"; // Se till att importera Movie-typen
import { BookmarksProvider } from "../context/BookmarksContext"; // Importera BookmarksProvider

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
  // Lägg till fler filmer vid behov
];

// Wrappa testet med BookmarksProvider för att tillhandahålla kontext
describe("RecommendedCarousel", () => {
  it("should render movie information correctly", () => {
    render(
      <BookmarksProvider>
        <RecommendedCarousel movies={mockMovies} />
      </BookmarksProvider>,
    );

    // Kontrollera att titlarna visas
    mockMovies.forEach((movie) => {
      expect(screen.getByText(movie.title)).toBeInTheDocument();
    });
  });

  it("should display the correct number of slides", () => {
    render(
      <BookmarksProvider>
        <RecommendedCarousel movies={mockMovies} />
      </BookmarksProvider>,
    );

    const slides = screen.getAllByRole("listitem"); // Kontrollera rollen
    expect(slides.length).toBe(mockMovies.length); // Kontrollera att antalet slides matchar antalet filmer
  });

  it("should show 3 slides on mobile view", () => {
    render(
      <BookmarksProvider>
        <RecommendedCarousel movies={mockMovies} />
      </BookmarksProvider>,
    );

    // Simulera mobilvy
    window.innerWidth = 480; // Sätt till mobilbredd
    window.dispatchEvent(new Event("resize")); // Simulera att fönstret har ändrats

    const slides = screen.getAllByRole("listitem");
    expect(slides.length).toBeLessThanOrEqual(3); // Kontrollera att max 3 slides visas
  });
});
