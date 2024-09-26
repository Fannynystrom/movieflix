import { render, screen } from "@testing-library/react";
import BookMarkedScreen from "../screens/BookmarkedScreen";
import { BookmarksProvider } from "../context/BookmarksContext";
import '@testing-library/jest-dom';  

test("visar meddelande när det inte finns några bokmärkta filmer", () => {
  render(
    <BookmarksProvider>
      <BookMarkedScreen />
    </BookmarksProvider>
  );
  const noBookmarksMessage = screen.getByText(/du har inga bokmärkta filmer/i);
  expect(noBookmarksMessage).toBeInTheDocument();  
});


