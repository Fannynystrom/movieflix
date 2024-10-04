import { describe, it, expect, beforeEach, afterEach, vi, Mock } from "vitest";
import { renderHook, cleanup, waitFor } from "@testing-library/react";
import useFetchMovies from "../hooks/FetchMovies";
import { onValue } from "firebase/database";

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
    getDatabase: vi.fn(), // Mockar getDatabase
  };
});

// Beskrivning av testsviten för useFetchMovies
describe("useFetchMovies", () => {
  // Rensa tidigare mocks före varje test
  beforeEach(() => {
    vi.clearAllMocks(); // Rensar tidigare mocks före varje test
  });

  // Avmontera alla renderade komponenter efter varje test
  afterEach(() => {
    cleanup(); // Avmontera alla renderade komponenter efter varje test
  });

  // Test 1: Hantera fel från databasen
  it("ska hantera fel från databasen", async () => {
    const errorMessage = "Ett fel inträffade";

    (onValue as Mock).mockImplementationOnce((_, __, errorCallback) => {
      errorCallback(new Error(errorMessage)); // Anropa felhanteraren med ett fel
      return vi.fn();
    });

    const { result } = renderHook(() => useFetchMovies());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBe(errorMessage);
    });
  });

  // Test 2: Sätta ageRating till 'Ej specificerad' om det inte finns
  it("ska sätta ageRating till 'Ej specificerad' om det inte finns", async () => {
    const mockData = {
      Film1: {
        title: "Film 1",
        genre: "Action",
        rating: "5",
        synopsis: "Spännande film",
        thumbnail: "link/to/thumbnail1.jpg",
        year: 2021,
        actors: ["Actor 1", "Actor 2"],
      },
    };

    (onValue as Mock).mockImplementationOnce((_, callback) => {
      callback({
        exists: () => true,
        val: () => mockData,
      });
      return vi.fn();
    });

    const { result } = renderHook(() => useFetchMovies());

    await waitFor(() => {
      expect(result.current.movies[0].ageRating).toBe("Ej specificerad");
    });
  });

  // Test 3: Returnera filmer i korrekt format
  it("ska returnera filmer i korrekt format", async () => {
    const { result } = renderHook(() => useFetchMovies());

    await waitFor(() => {
      result.current.movies.forEach((movie) => {
        expect(movie).toHaveProperty("title");
        expect(movie).toHaveProperty("genre");
        expect(movie).toHaveProperty("rating");
        expect(movie).toHaveProperty("synopsis");
        expect(movie).toHaveProperty("thumbnail");
        expect(movie).toHaveProperty("year");
        expect(movie).toHaveProperty("actors");
      });
    });
  });

  // Test 4: Hantera tom filmdata
  it("ska hantera tom filmdata", async () => {
    (onValue as Mock).mockImplementationOnce((_, callback) => {
      callback({
        exists: () => true,
        val: () => ({}), // Tom databas
      });
      return vi.fn(); // Returnera en mockad unsubscribe-funktion
    });

    const { result } = renderHook(() => useFetchMovies());

    await waitFor(() => {
      expect(result.current.movies.length).toBe(0); // Ingen film ska returneras
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBe(null);
    });
  });

  // Test 5: Avprenumerera från databasen vid avmontering
  it("ska avprenumerera från databasen vid avmontering", () => {
    const { unmount } = renderHook(() => useFetchMovies());

    unmount(); // Avmontera hooken

    // Verifiera att unsubscribe-funktionen anropas
    expect(onValue).toHaveBeenCalled(); // Kontrollera att onValue anropades
  });

  // Test 6: Hämta filmer och sätta loading till false
  it("ska hämta filmer och sätta loading till false", async () => {
    const { result } = renderHook(() => useFetchMovies());

    await waitFor(() => {
      expect(result.current.movies.length).toBe(2);
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBe(null);
    });
  });

  // Test 7: Randomisera filmer när randomize är true
  it("ska randomisera filmer när randomize är true", async () => {
    const { result } = renderHook(() => useFetchMovies(true));

    await waitFor(() => {
      const movies = result.current.movies;
      expect(movies.length).toBe(2);
      // Kontrollera att filmerna inte är i ordning. Eftersom vi använder en slumpgenerator, kan vi inte förutsäga ordningen, så vi bara kollar att de är olika.
      expect(movies[0].title).not.toBe(movies[1].title);
    });
  });

  // Test 8: Returnera korrekta filmdetaljer
  it("ska returnera korrekta filmdetaljer", async () => {
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
