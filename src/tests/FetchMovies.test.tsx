import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { renderHook, cleanup, waitFor } from "@testing-library/react";
import useFetchMovies from "../hooks/FetchMovies";
import { onValue } from "firebase/database";

// Mocka firebase/database
vi.mock("firebase/database", () => {
  return {
    ref: vi.fn(),
    onValue: vi.fn((_, callback) => {
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
      });

      return vi.fn();
    }),
    getDatabase: vi.fn(),
  };
});

describe("useFetchMovies", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  it("fetches movies and sets loading to false", async () => {
    const { result } = renderHook(() => useFetchMovies());
    await waitFor(() => {
      expect(result.current.movies.length).toBe(2);
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBe(null);
    });
  });

  it("handles error correctly", async () => {
    vi.mocked(onValue).mockImplementationOnce((_, callback, errorCallback) => {
      errorCallback(new Error("Firebase error"));
      return vi.fn();
    });

    const { result } = renderHook(() => useFetchMovies());
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBe("Firebase error");
      expect(result.current.movies.length).toBe(0);
    });
  });

  it("returns an empty array and sets loading to false when no movies exist", async () => {
    vi.mocked(onValue).mockImplementationOnce((_, callback) => {
      callback({
        exists: () => false,
        val: () => ({}),
      });
      return vi.fn();
    });

    const { result } = renderHook(() => useFetchMovies());
    await waitFor(() => {
      expect(result.current.movies.length).toBe(0);
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBe(null);
    });
  });

  it("randomizes movies when randomize is true", async () => {
    const { result } = renderHook(() => useFetchMovies(true));
    await waitFor(() => {
      const movies = result.current.movies;
      expect(movies.length).toBe(2);
      expect(movies[0].title).not.toBe(movies[1].title);
    });
  });

  it("returns correct movie details", async () => {
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
