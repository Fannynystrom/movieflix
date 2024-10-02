// import "@testing-library/jest-dom";
// import { vi } from "vitest";
// import { Movie } from "../types/Movies"; // Importera typen Movie från src/types

// // Mocka Firebase-konfigurationen
// vi.mock("../../config/firebase", () => {
//   const ref = vi.fn(); // Mocka ref-funktionen

//   // Mocka snapshot för Firebase med Movie-typen
//   const snapshot = {
//     exists: vi.fn(() => true), // Mockar att datan existerar
//     val: vi.fn(() => ({
//       movie1: {
//         title: "Film 1",
//         genre: "Action",
//         rating: "5",
//         synopsis: "Spännande film",
//         thumbnail: "link/to/thumbnail1.jpg",
//         year: 2021,
//         actors: ["Actor 1", "Actor 2"],
//       },
//       movie2: {
//         title: "Film 2",
//         genre: "Komedi",
//         rating: "4",
//         synopsis: "Rolig film",
//         thumbnail: "link/to/thumbnail2.jpg",
//         year: 2020,
//         actors: ["Actor 3", "Actor 4"],
//       },
//     })),
//   };

//   // Mocka onValue för att simulera både datainsamling och fel
//   const onValue = vi.fn(
//     (
//       _ref: unknown, // Vi mockar ref här
//       callback: (snapshot: { val: () => Record<string, Movie> }) => void,
//       errorCallback?: (error: Error) => void,
//     ) => {
//       if (errorCallback) {
//         errorCallback(new Error("Mocked Firebase Error")); // Simulera ett fel
//       } else {
//         callback(snapshot); // Returnera mockad data om inget fel
//       }
//     },
//   );

//   return {
//     database: {
//       ref, // Returnera den mockade ref-funktionen
//       onValue, // Returnera den mockade onValue-funktionen
//     },
//   };
// });
import { renderHook } from "@testing-library/react";
import useFetchMovies from "../hooks/FetchMovies";
import { vi } from "vitest";

describe("useFetchMovies hook", () => {
  it("should return movies when data is successfully fetched", () => {
    const { result } = renderHook(() => useFetchMovies());

    expect(result.current.movies.length).toBe(2); // Testa att 2 filmer returneras
    expect(result.current.loading).toBe(false); // Testa att laddningen är klar
    expect(result.current.error).toBeNull(); // Testa att inga fel uppstått
  });

  it("should handle errors correctly", () => {
    // Simulera ett fel från Firebase
    vi.mocked(onValue).mockImplementationOnce((errorCallback) => {
      errorCallback(new Error("Network error"));
    });

    const { result } = renderHook(() => useFetchMovies());

    expect(result.current.movies.length).toBe(0); // Ingen data returneras vid fel
    expect(result.current.error).toBe("Network error"); // Felmeddelandet testas
  });
});
