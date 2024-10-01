import "@testing-library/jest-dom";
import { vi } from "vitest";
import { Movie } from "./src/types/Movies"; // Importera typen Movie från src/types

// Mocka Firebase-konfigurationen
vi.mock("../config/firebase", () => {
  const ref = vi.fn(); // Mocka ref-funktionen

  // Mocka snapshot för Firebase med Movie-typen
  const snapshot = {
    exists: vi.fn(() => true),
    val: vi.fn(() => ({
      movie1: {
        title: "Film 1",
        genre: "Action",
        rating: "5",
        synopsis: "Spännande film",
        thumbnail: "link/to/thumbnail1.jpg",
        year: 2021,
        actors: ["Actor 1", "Actor 2"],
      },
      movie2: {
        title: "Film 2",
        genre: "Komedi",
        rating: "4",
        synopsis: "Rolig film",
        thumbnail: "link/to/thumbnail2.jpg",
        year: 2020,
        actors: ["Actor 3", "Actor 4"],
      },
    })),
  };

  // Specifik typ för callback som använder Movie-typen
  const onValue = vi.fn(
    (
      ref: unknown,
      callback: (snapshot: { val: () => Record<string, Movie> }) => void,
    ) => {
      callback(snapshot); // Skicka tillbaka mockad data
    },
  );

  return { ref, onValue };
});
