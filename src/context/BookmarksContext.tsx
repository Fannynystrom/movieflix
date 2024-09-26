import React, { createContext, useState, useContext, useEffect } from "react";

interface Movie {
  title: string;
  thumbnail: string;
  synopsis: string;
  rating: string;
  genre: string;
  year: number;
  actors: string[];
}

interface BookmarksContextType {
  bookmarks: Movie[];
  addBookmark: (movie: Movie) => void;
  removeBookmark: (title: string) => void;
  isBookmarked: (title: string) => boolean;
}

const BookmarksContext = createContext<BookmarksContextType | undefined>(
  undefined,
);

export const useBookmarks = (): BookmarksContextType => {
  const context = useContext(BookmarksContext);
  if (!context) {
    throw new Error("useBookmarks must be used within a BookmarksProvider");
  }
  return context;
};

export const BookmarksProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Använd en Lazy Initializer-funktion för att sätta initialt state från localStorage
  const [bookmarks, setBookmarks] = useState<Movie[]>(() => {
    const storedBookmarks = localStorage.getItem("bookmarks");
    return storedBookmarks ? JSON.parse(storedBookmarks) : [];
  });

  // Spara bokmärken till localStorage när de ändras
  useEffect(() => {
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }, [bookmarks]);

  const addBookmark = (movie: Movie) => {
    setBookmarks((prevBookmarks) => [...prevBookmarks, movie]);
  };

  const removeBookmark = (title: string) => {
    setBookmarks((prevBookmarks) =>
      prevBookmarks.filter((movie) => movie.title !== title),
    );
  };

  const isBookmarked = (title: string) => {
    return bookmarks.some((movie) => movie.title === title);
  };

  return (
    <BookmarksContext.Provider
      value={{ bookmarks, addBookmark, removeBookmark, isBookmarked }}
    >
      {children}
    </BookmarksContext.Provider>
  );
};
