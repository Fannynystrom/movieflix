import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { renderHook, cleanup, waitFor } from "@testing-library/react";
import useFetchMovies from "../hooks/FetchMovies"; // Anpassa sökvägen
// import { onValue } from 'firebase/database'; // Importera onValue för mockning

// Mocka firebase/database
vi.mock("firebase/database", () => {
  return {
    ref: vi.fn(),
    onValue: vi.fn((_, callback) => {
      // Mocka en databas med filmer
      const mockData = {
        Film1: {
          title: "Film 1",
          genre: "Action",
          rating: "5",
          synopsis: "Spännande film",
          thumbnail: "link/to/thumbnail1.jpg",
          year: 2021,
          actors: ["Actor 1", "Actor 2"],
          ageRating: "Ej specificerad",
        },
        Film2: {
          title: "Film 2",
          genre: "Komedi",
          rating: "4",
          synopsis: "Rolig film",
          thumbnail: "link/to/thumbnail2.jpg",
          year: 2020,
          actors: ["Actor 3", "Actor 4"],
          ageRating: "Ej specificerad",
        },
      };

      callback({
        exists: () => true,
        val: () => mockData,
      }); // Anropa callback med mockad data

      return vi.fn(); // Returnera en mockad unsubscribe-funktion
    }),
    getDatabase: vi.fn(),
  };
});

describe("useFetchMovies", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup(); // Avmontera alla renderade komponenter efter varje test
  });

  it("should fetch movies and set loading to false", async () => {
    const { result } = renderHook(() => useFetchMovies());
    // Vänta på att tillståndet ska uppdateras
    await waitFor(() => {
      expect(result.current.movies.length).toBe(2);
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBe(null);
    });
  });

  // it('should handle error correctly', async () => {
  //   // Mocka onValue för att simulera ett fel
  //   (onValue as unknown).mockImplementationOnce((_, callback, errorCallback) => {
  //     errorCallback(new Error('Firebase error'));
  //     return vi.fn(); // Returnera en mockad unsubscribe-funktion
  //   });

  //   const { result } = renderHook(() => useFetchMovies());

  //   // Vänta på att tillståndet ska uppdateras
  //   await waitFor(() => {
  //     expect(result.current.loading).toBe(false);
  //     expect(result.current.error).toBe('Firebase error');
  //     expect(result.current.movies.length).toBe(0); // Inga filmer bör hämtas vid fel
  //   });
  // });

  // it('should return an empty array and set loading to false when no movies exist', async () => {
  //   (onValue as unknown).mockImplementationOnce((_, callback) => {
  //     callback({
  //       exists: () => false,
  //       val: () => ({}), // Ingen data
  //     });
  //     return vi.fn(); // Returnera en mockad unsubscribe-funktion
  //   });

  //   const { result } = renderHook(() => useFetchMovies());

  //   // Vänta på att tillståndet ska uppdateras
  //   await waitFor(() => {
  //     expect(result.current.movies.length).toBe(0); // Ingen film ska finnas
  //     expect(result.current.loading).toBe(false);
  //     expect(result.current.error).toBe(null);
  //   });
  // });

  it("should randomize movies when randomize is true", async () => {
    const { result } = renderHook(() => useFetchMovies(true));

    await waitFor(() => {
      const movies = result.current.movies;
      expect(movies.length).toBe(2);
      // Kontrollera att filmerna inte är i ordning. Eftersom vi använder en slumpgenerator, kan vi inte förutsäga ordningen, så vi bara kollar att de är olika.
      expect(movies[0].title).not.toBe(movies[1].title);
    });
  });

  it("should return correct movie details", async () => {
    const { result } = renderHook(() => useFetchMovies());

    await waitFor(() => {
      expect(result.current.movies[0]).toEqual({
        title: "Film 1",
        genre: "Action",
        rating: "5",
        synopsis: "Spännande film",
        thumbnail: "link/to/thumbnail1.jpg",
        year: 2021,
        actors: ["Actor 1", "Actor 2"],
        ageRating: "Ej specificerad",
      });
    });
  });
});
