import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import MovieCard from "../components/MovieCard";
import { useBookmarks } from "../context/BookmarksContext"; // Mocka BookmarksContext

// Mocka BookmarksContext-funktioner
vi.mock("../context/BookmarksContext", () => ({
  useBookmarks: () => ({
    addBookmark: vi.fn(),
    removeBookmark: vi.fn(),
    isBookmarked: vi.fn(() => false),
  }),
}));

// Mockdata för att simulera en film
const mockMovie = {
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
    render(<MovieCard {...mockMovie} />);

    // Kontrollera att titeln visas
    expect(screen.getByText("Test Movie")).toBeInTheDocument();

    // Kontrollera att synopsis visas
    expect(
      screen.getByText("This is a test movie synopsis."),
    ).toBeInTheDocument();

    // Kontrollera att genre visas
    expect(screen.getByText("Action")).toBeInTheDocument();

    // Kontrollera att year visas
    expect(screen.getByText("2021")).toBeInTheDocument();

    // Kontrollera att actors visas
    expect(screen.getByText("Actor 1, Actor 2")).toBeInTheDocument();

    // Kontrollera att bilden visas korrekt
    const thumbnail = screen.getByAltText("Test Movie");
    expect(thumbnail).toHaveAttribute("src", "test-thumbnail.jpg");
  });

  // Test 2: Testa bokmärkesknappen
  it("should toggle bookmark status when the bookmark button is clicked", () => {
    const { addBookmark, removeBookmark, isBookmarked } = useBookmarks();

    render(<MovieCard {...mockMovie} />);

    // Simulera att filmen inte är bokmärkt initialt
    vi.mocked(isBookmarked).mockReturnValueOnce(false);

    // Klicka på bokmärkesknappen för att lägga till bokmärke
    const bookmarkButton = screen.getByRole("button", { name: /bookmark/i });
    fireEvent.click(bookmarkButton);

    // Kontrollera att addBookmark anropades
    expect(addBookmark).toHaveBeenCalledWith(mockMovie);

    // Simulera att filmen är bokmärkt
    vi.mocked(isBookmarked).mockReturnValueOnce(true);

    // Klicka på bokmärkesknappen för att ta bort bokmärke
    fireEvent.click(bookmarkButton);

    // Kontrollera att removeBookmark anropades
    expect(removeBookmark).toHaveBeenCalledWith(mockMovie.title);
  });

  // Test 3: Testa dropdown-knappen för mer information
  it("should toggle more information when the dropdown button is clicked", () => {
    render(<MovieCard {...mockMovie} />);

    // Kontrollera att den extra informationen inte visas initialt
    expect(screen.queryByText("Rating: 5")).not.toBeInTheDocument();

    // Klicka på "More Info"-knappen
    const dropdownButton = screen.getByText("▼ More Info");
    fireEvent.click(dropdownButton);

    // Kontrollera att den extra informationen visas
    expect(screen.getByText("Rating: 5")).toBeInTheDocument();
    expect(screen.getByText("Genre: Action")).toBeInTheDocument();

    // Klicka igen för att gömma informationen
    fireEvent.click(dropdownButton);

    // Kontrollera att informationen inte längre visas
    expect(screen.queryByText("Rating: 5")).not.toBeInTheDocument();
  });

  // Test 4: Testa fallback-bild när thumbnail inte laddas korrekt
  it("should show fallback image if thumbnail fails to load", () => {
    render(<MovieCard {...mockMovie} />);

    // Hämta bildelementet
    const thumbnail = screen.getByAltText("Test Movie");

    // Simulera att bildladdningen misslyckas
    fireEvent.error(thumbnail);

    // Kontrollera att fallback-bilden laddas
    expect(thumbnail).toHaveAttribute("src", "path/to/fallback-image.jpg");
  });
});
