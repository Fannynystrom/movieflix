import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest"; // Använd vi istället för jest för Vitest
import TrendingCarousel from "../screens/TrendingCarousel";
import { Movie } from "../types/Movies";
import { BookmarksProvider } from "../context/BookmarksContext"; // Importera BookmarksProvider

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
    synopsis: "The definiton of paranoia.",
    thumbnail: "link/to/thumbnail3.jpg",
    year: 2020,
    actors: ["Actor 5", "Actor 5"],
  },
];

// Definiera testsviten för TrendingCarousel
describe("TrendingCarousel", () => {
  it("should render the correct number of slides", () => {
    render(
      <BookmarksProvider>
        <TrendingCarousel movies={mockMovies} />
      </BookmarksProvider>,
    );
    const slides = screen.getAllByRole("listitem");
    expect(slides.length).toBe(mockMovies.length);
  });

  it("should render movie details in each slide", () => {
    render(
      <BookmarksProvider>
        <TrendingCarousel movies={mockMovies} />
      </BookmarksProvider>,
    );
    expect(screen.getByText("Movie 1")).toBeInTheDocument();
    expect(screen.getByText("Movie 2")).toBeInTheDocument();
    expect(screen.getByText("Movie 3")).toBeInTheDocument();
  });

  // Test för mobilvy
  it("should show 3 slides on mobile view", () => {
    // Använd vi.fn() för att skapa en mock för window.resizeTo
    window.resizeTo = vi.fn().mockImplementation((width, height) => {
      window.innerWidth = width;
      window.innerHeight = height;
      window.dispatchEvent(new Event("resize"));
    });

    // Ändra fönsterstorleken till en mobilstorlek
    window.resizeTo(480, 800);

    render(
      <BookmarksProvider>
        <TrendingCarousel movies={mockMovies} />
      </BookmarksProvider>,
    );

    // Kontrollera att rätt antal slides visas i mobilvyn
    const slides = screen.getAllByRole("listitem");
    expect(slides.length).toBe(3); // Anpassa efter brytpunktsinställningar
  });
});
