import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MovieCard from "../components/MovieCard";
import BookMarkedScreen from "../screens/BookmarkedScreen";
import { useBookmarks } from "../context/BookmarksContext"; // Mockar denna hook
import "@testing-library/jest-dom"; // För jest-dom matchers
import { describe, it, vi, expect, Mock } from "vitest"; // Importera alla Vitest-funktioner
import { Movie } from "../types/Movies"; // Importera Movie-typen

// Mockar två filmer med Movie-typen
const mockBookmarks: Movie[] = [
  {
    title: "Film 1",
    thumbnail: "thumbnail1.jpg",
    synopsis: "Synopsis för Film 1",
    rating: "5",
    genre: "Drama",
    year: 2022,
    actors: ["Skådespelare 1", "Skådespelare 2"],
  },
  {
    title: "Film 2",
    thumbnail: "thumbnail2.jpg",
    synopsis: "Synopsis för Film 2",
    rating: "4",
    genre: "Action",
    year: 2021,
    actors: ["Skådespelare A", "Skådespelare B"],
  },
];

// Mockar en enskild film för att testa borttagning och tillägg
const mockMovie: Movie = {
  title: "Film 1",
  thumbnail: "thumbnail1.jpg",
  synopsis: "Synopsis för Film 1",
  rating: "5",
  genre: "Drama",
  year: 2022,
  actors: ["Skådespelare 1", "Skådespelare 2"],
};

vi.mock("../context/BookmarksContext", () => ({
  useBookmarks: vi.fn(),
}));

describe("BookMarkedScreen Component Tests", () => {
  // Test 1: Visa meddelande när det inte finns några bokmärkta filmer
  it("visar meddelande när det inte finns några bokmärkta filmer", () => {
    (useBookmarks as Mock).mockReturnValue({
      bookmarks: [],
      addBookmark: vi.fn(),
      removeBookmark: vi.fn(),
      isBookmarked: vi.fn(),
    });

    render(<BookMarkedScreen />);

    const noBookmarksMessage = screen.getByText(
      /du har inga bokmärkta filmer/i,
    );
    expect(noBookmarksMessage).toBeInTheDocument();
  });

  // Test 2: Visar bokmärken när de finns
  it("visar bokmärken när de finns", () => {
    (useBookmarks as Mock).mockReturnValue({
      bookmarks: mockBookmarks,
      addBookmark: vi.fn(),
      removeBookmark: vi.fn(),
      isBookmarked: vi.fn(),
    });

    render(<BookMarkedScreen />);

    const movie1 = screen.getByText(/film 1/i);
    const movie2 = screen.getByText(/film 2/i);

    expect(movie1).toBeInTheDocument();
    expect(movie2).toBeInTheDocument();
  });

  // Test 3: Lägg till ett bokmärke och uppdatera localStorage
  it("lägger till ett bokmärke och uppdaterar localStorage", async () => {
    const user = userEvent.setup();

    const mockAddBookmark = vi.fn((movie: Movie) => {
      localStorage.setItem("bookmarks", JSON.stringify([movie]));
    });
    const mockRemoveBookmark = vi.fn();
    const mockIsBookmarked = vi.fn().mockReturnValue(false);

    const setItemSpy = vi.spyOn(Storage.prototype, "setItem");

    (useBookmarks as Mock).mockReturnValue({
      bookmarks: [],
      addBookmark: mockAddBookmark,
      removeBookmark: mockRemoveBookmark,
      isBookmarked: mockIsBookmarked,
    });

    const { container, rerender } = render(<MovieCard {...mockMovie} />);

    expect(mockIsBookmarked(mockMovie.title)).toBe(false);

    const bookmarkButton = container.querySelector(".bookmark-button");
    expect(bookmarkButton).toBeInTheDocument();

    await user.click(bookmarkButton!);

    expect(mockAddBookmark).toHaveBeenCalledWith(mockMovie);

    expect(setItemSpy).toHaveBeenCalledWith(
      "bookmarks",
      JSON.stringify([mockMovie]),
    );

    mockIsBookmarked.mockReturnValue(true);
    rerender(<MovieCard {...mockMovie} />);
    expect(mockIsBookmarked(mockMovie.title)).toBe(true);
  });

  // Test 4: Ta bort ett bokmärke och uppdatera localStorage
  it("tar bort ett bokmärke och uppdaterar localStorage", async () => {
    const user = userEvent.setup();

    const mockAddBookmark = vi.fn();
    const mockRemoveBookmark = vi.fn(() => {
      localStorage.setItem("bookmarks", JSON.stringify([]));
    });

    const mockIsBookmarked = vi.fn().mockReturnValue(true);

    const setItemSpy = vi.spyOn(Storage.prototype, "setItem");

    (useBookmarks as Mock).mockReturnValue({
      bookmarks: [mockMovie],
      addBookmark: mockAddBookmark,
      removeBookmark: mockRemoveBookmark,
      isBookmarked: mockIsBookmarked,
    });

    const { container, rerender } = render(<MovieCard {...mockMovie} />);

    expect(mockIsBookmarked(mockMovie.title)).toBe(true);

    const bookmarkButton = container.querySelector(".bookmark-button");
    expect(bookmarkButton).toBeInTheDocument();

    await user.click(bookmarkButton!);

    expect(mockRemoveBookmark).toHaveBeenCalledWith(mockMovie.title);

    expect(setItemSpy).toHaveBeenCalledWith("bookmarks", JSON.stringify([]));

    mockIsBookmarked.mockReturnValue(false);
    rerender(<MovieCard {...mockMovie} />);
    expect(mockIsBookmarked(mockMovie.title)).toBe(false);
  });
});
