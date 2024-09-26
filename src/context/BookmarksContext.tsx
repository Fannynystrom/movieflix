import React, { createContext, useState, useContext } from 'react';

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

const BookmarksContext = createContext<BookmarksContextType | undefined>(undefined);

export const useBookmarks = (): BookmarksContextType => {
  const context = useContext(BookmarksContext);
  if (!context) {
    throw new Error('useBookmarks must be used within a BookmarksProvider');
  }
  return context;
};

export const BookmarksProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [bookmarks, setBookmarks] = useState<Movie[]>([]);

  const addBookmark = (movie: Movie) => {
    setBookmarks((prevBookmarks) => [...prevBookmarks, movie]);
  };

  const removeBookmark = (title: string) => {
    setBookmarks((prevBookmarks) => prevBookmarks.filter((movie) => movie.title !== title));
  };

  const isBookmarked = (title: string) => {
    return bookmarks.some((movie) => movie.title === title);
  };

  return (
    <BookmarksContext.Provider value={{ bookmarks, addBookmark, removeBookmark, isBookmarked }}>
      {children}
    </BookmarksContext.Provider>
  );
};
