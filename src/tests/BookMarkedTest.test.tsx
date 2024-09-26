import { render, screen } from "@testing-library/react";
import BookMarkedScreen from "../screens/BookmarkedScreen";
import { useBookmarks } from "../context/BookmarksContext"; // mockar denna hook
import '@testing-library/jest-dom';  

// ersätter useBookmarks-hooken med mockad data
jest.mock('../context/BookmarksContext', () => ({
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

  // kollar att båda fikmerna renderar bokmärke
  const movie1 = screen.getByText(/film 1/i);
  const movie2 = screen.getByText(/film 2/i);

  expect(movie1).toBeInTheDocument();
  expect(movie2).toBeInTheDocument();
});
