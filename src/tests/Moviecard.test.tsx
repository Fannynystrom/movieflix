import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import MovieCard from "../components/MovieCard";
import { BookmarksProvider } from "../context/BookmarksContext"; // Importera BookmarksProvider
import { Movie } from "../types/Movies"; // Importera Movie-typen
import userEvent from "@testing-library/user-event"; // Importera userEvent

// Mockdata för att simulera en film
const mockMovie: Movie = {
  title: "Test Movie",
  thumbnail: "test-thumbnail.jpg",
  synopsis: "This is a test movie synopsis.",
  rating: "5",
  genre: "Action",
  year: 2021,
  actors: ["Actor 1", "Actor 2"],
};

describe("MovieCard", () => {
  // Test 1: Kontrollera att alla delar av MovieCard renderas korrekt
  it("should render movie information correctly", () => {
    render(
      <BookmarksProvider>
        <MovieCard {...mockMovie} />
      </BookmarksProvider>,
    );

    // Kontrollera att titeln visas
    expect(screen.getByText("Test Movie")).toBeInTheDocument();

    expect(screen.getByText("5")).toBeInTheDocument();

    // Kontrollera att year visas
    expect(screen.getByText("2021")).toBeInTheDocument();

    // Kontrollera att bilden visas korrekt
    const thumbnail = screen.getByAltText("Test Movie");
    expect(thumbnail).toHaveAttribute("src", "test-thumbnail.jpg");
  });

  // Test 2: Testa bokmärkesknappen
  it("should toggle bookmark status", async () => {
    render(
      <BookmarksProvider>
        <MovieCard {...mockMovie} />
      </BookmarksProvider>,
    );

    // Kontrollera initialt att knappen visar "Add bookmark"
    const bookmarkButton = screen.getByRole("button", {
      name: /Add bookmark/i,
    });
    expect(bookmarkButton).toBeInTheDocument();

    // Klicka på bokmärkesknappen för att lägga till bokmärke
    await userEvent.click(bookmarkButton);

    // Kontrollera att knappen nu visar "Remove bookmark"
    expect(
      screen.getByRole("button", { name: /Remove bookmark/i }),
    ).toBeInTheDocument();

    // Klicka på bokmärkesknappen för att ta bort bokmärke
    await userEvent.click(
      screen.getByRole("button", { name: /Remove bookmark/i }),
    );

    // Kontrollera att knappen visar "Add bookmark" igen
    expect(
      screen.getByRole("button", { name: /Add bookmark/i }),
    ).toBeInTheDocument();
  });

  // Test 3: Testa fallback-bild när thumbnail inte laddas korrekt
  it("should show fallback image if thumbnail fails to load", () => {
    render(
      <BookmarksProvider>
        <MovieCard {...mockMovie} />
      </BookmarksProvider>,
    );

    const thumbnail = screen.getByAltText("Test Movie");
    fireEvent.error(thumbnail); // Simulera att bildladdningen misslyckas
    expect(thumbnail).toHaveAttribute("src", "test-thumbnail.jpg");
  });
});
