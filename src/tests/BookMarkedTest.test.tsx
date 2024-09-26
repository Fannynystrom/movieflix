import { render, screen, fireEvent } from "@testing-library/react";
import MovieCard from "../components/MovieCard";
import BookMarkedScreen from "../screens/BookmarkedScreen";
import { useBookmarks } from "../context/BookmarksContext"; // mockar denna hook
import "@testing-library/jest-dom"; // För jest-dom matchers

// ersätter useBookmarks-hooken med mockad data från context
jest.mock("../context/BookmarksContext", () => ({
  useBookmarks: jest.fn(),
}));

// mockar två filmer med bokmärken
const mockBookmarks = [
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

// mockar en film för att testa borttagning och tillägg
const mockMovie = {
  title: "Film 1",
  thumbnail: "thumbnail1.jpg",
  synopsis: "Synopsis för Film 1",
  rating: "5",
  genre: "Drama",
  year: 2022,
  actors: ["Skådespelare 1", "Skådespelare 2"],
};

// Test 1: Visa meddelande när det inte finns några bokmärkta filmer
test("visar meddelande när det inte finns några bokmärkta filmer", () => {
  // mockar att inga bokmärken finns
  (useBookmarks as jest.Mock).mockReturnValue({
    bookmarks: [],
    addBookmark: jest.fn(),
    removeBookmark: jest.fn(),
    isBookmarked: jest.fn(),
  });

  render(<BookMarkedScreen />);

  // kollar så att meddelandet syns om ej några bokmärken finns
  const noBookmarksMessage = screen.getByText(/du har inga bokmärkta filmer/i);
  expect(noBookmarksMessage).toBeInTheDocument();
});

// Test 2: testar de två mockade bokmärkerna
test("visar bokmärken när de finns", () => {
  (useBookmarks as jest.Mock).mockReturnValue({
    bookmarks: mockBookmarks,
    addBookmark: jest.fn(),
    removeBookmark: jest.fn(),
    isBookmarked: jest.fn(),
  });

  render(<BookMarkedScreen />);

  // kollar att båda filmerna renderar bokmärke
  const movie1 = screen.getByText(/film 1/i);
  const movie2 = screen.getByText(/film 2/i);

  expect(movie1).toBeInTheDocument();
  expect(movie2).toBeInTheDocument();
});

// Test 3: testar att lägga till ett bokmärke och uppdatera localStorage
test("lägger till ett bokmärke och uppdaterar localStorage", () => {
  const mockAddBookmark = jest.fn((movie) => {
    localStorage.setItem("bookmarks", JSON.stringify([movie]));
  });
  const mockRemoveBookmark = jest.fn();
  const mockIsBookmarked = jest.fn().mockReturnValue(false);

  // Mocka localStorage.setItem
  const setItemSpy = jest.spyOn(Storage.prototype, "setItem");

  // mockar useBookmarks
  (useBookmarks as jest.Mock).mockReturnValue({
    bookmarks: [],
    addBookmark: mockAddBookmark,
    removeBookmark: mockRemoveBookmark,
    isBookmarked: mockIsBookmarked,
  });

  const { container, rerender } = render(<MovieCard {...mockMovie} />);

  // kollar att filmen inte är bokmärkt innan vi lägger till den
  expect(mockIsBookmarked(mockMovie.title)).toBe(false);

  // hitta knappen med querySelector
  const bookmarkButton = container.querySelector(".bookmark-button");
  expect(bookmarkButton).toBeInTheDocument();

  fireEvent.click(bookmarkButton!);

  expect(mockAddBookmark).toHaveBeenCalledWith(mockMovie);

  // kollar att localStorage har uppdaterats med den nya filmen
  expect(setItemSpy).toHaveBeenCalledWith(
    "bookmarks",
    JSON.stringify([mockMovie]),
  );

  // uppdaterar mock - simulerar att bokmärke lagts till
  mockIsBookmarked.mockReturnValue(true);

  // simulerar att listan har uppdaterats
  rerender(<MovieCard {...mockMovie} />);

  expect(mockIsBookmarked(mockMovie.title)).toBe(true);
});

// Test 4: testar att ta bort ett bokmärke och uppdatera localStorage
test("tar bort ett bokmärke och uppdaterar localStorage", () => {
  const mockAddBookmark = jest.fn();
  const mockRemoveBookmark = jest.fn(() => {
    localStorage.setItem("bookmarks", JSON.stringify([]));
  });

  const mockIsBookmarked = jest.fn().mockReturnValue(true);

  // mockar localStorage.setItem
  const setItemSpy = jest.spyOn(Storage.prototype, "setItem");

  // mockar useBookmarks
  (useBookmarks as jest.Mock).mockReturnValue({
    bookmarks: [mockMovie],
    addBookmark: mockAddBookmark,
    removeBookmark: mockRemoveBookmark,
    isBookmarked: mockIsBookmarked,
  });

  const { container, rerender } = render(<MovieCard {...mockMovie} />);

  // kollar att filmen är bokmärkt innan vi tar bort den
  expect(mockIsBookmarked(mockMovie.title)).toBe(true);

  // hitta knappen med querySelector
  const bookmarkButton = container.querySelector(".bookmark-button");
  expect(bookmarkButton).toBeInTheDocument();

  fireEvent.click(bookmarkButton!);

  expect(mockRemoveBookmark).toHaveBeenCalledWith(mockMovie.title);

  // kollar att localStorage har uppdaterats
  expect(setItemSpy).toHaveBeenCalledWith("bookmarks", JSON.stringify([]));

  // uppdaterar mock
  mockIsBookmarked.mockReturnValue(false);

  // renderar om komponenten för att simulera att listan har uppdaterats
  rerender(<MovieCard {...mockMovie} />);

  expect(mockIsBookmarked(mockMovie.title)).toBe(false);
});
