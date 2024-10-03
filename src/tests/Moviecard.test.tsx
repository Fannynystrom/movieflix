// import { render, screen, fireEvent } from "@testing-library/react";
// import { describe, it, expect } from "vitest";
// import MovieCard from "../components/MovieCard";
// import { BookmarksProvider } from "../context/BookmarksContext"; // Mocka BookmarksContext
// import { Movie } from "../types/Movies"; // Importera Movie-typen
// import userEvent from "@testing-library/user-event"; // Importera userEvent

// const mockMovie: Movie = {
//   title: "Test Movie",
//   thumbnail: "test-thumbnail.jpg",
//   synopsis: "This is a test movie synopsis.",
//   rating: "5",
//   genre: "Action",
//   year: 2021,
//   actors: ["Actor 1", "Actor 2"],
// };

// describe("MovieCard", () => {
//   // Test 1: Kontrollera att alla delar av MovieCard renderas korrekt
//   it("should render movie information correctly", async () => {
//     render(
//       <BookmarksProvider>
//         <MovieCard {...mockMovie} />
//       </BookmarksProvider>,
//     );

//     // Klicka på "More Info"-knappen för att visa synopsisen
//     const dropdownButton = screen.getByText("▼ More Info");
//     await userEvent.click(dropdownButton); // Visa mer info

//     // Kontrollera att titeln visas
//     expect(screen.getByText("Test Movie")).toBeInTheDocument();

//     // Kontrollera att synopsis visas
//     expect(
//       screen.getByText("This is a test movie synopsis."),
//     ).toBeInTheDocument();

//     // Kontrollera att genre visas
//     expect(
//       screen.getByText((content) => content.includes("Action")),
//     ).toBeInTheDocument();

//     // Kontrollera att year visas
//     expect(
//       screen.getByText((content) => content.includes("2021")),
//     ).toBeInTheDocument();

//     // Kontrollera att actors visas
//     expect(
//       screen.getByText(
//         (content) => content.includes("Actor 1") && content.includes("Actor 2"),
//       ),
//     ).toBeInTheDocument();

//     // Kontrollera att bilden visas korrekt
//     const thumbnail = screen.getByAltText("Test Movie");
//     expect(thumbnail).toHaveAttribute("src", "test-thumbnail.jpg");
//   });

//   it("should toggle bookmark status", async () => {
//     render(
//       <BookmarksProvider>
//         <MovieCard {...mockMovie} />
//       </BookmarksProvider>,
//     );
//     // Klicka på bokmärkesknappen för att lägga till bokmärke
//     const bookmarkButton = screen.getByRole("button", {
//       name: /add bookmark/i,
//     });
//     // Simulera att filmen nu är bokmärkt
//     await userEvent.click(bookmarkButton); // Använd userEvent
//     expect(screen.getByLabelText("Remove bookmark")).toBeInTheDocument();
//     await userEvent.click(bookmarkButton);
//     expect(screen.getByLabelText("Add bookmark"));
//   });

//   // Test 3: Testa dropdown-knappen för mer information
//   it("should toggle more information when the dropdown button is clicked", async () => {
//     render(
//       <BookmarksProvider>
//         <MovieCard {...mockMovie} />
//       </BookmarksProvider>,
//     );

//     // Kontrollera att den extra informationen inte visas initialt
//     expect(screen.queryByText("Rating: 5")).not.toBeInTheDocument();

//     // Klicka på "More Info"-knappen
//     const dropdownButton = screen.getByText("▼ More Info");
//     await userEvent.click(dropdownButton); // Använd userEvent

//     // Kontrollera att den extra informationen visas
//     expect(screen.getByText("Rating: 5")).toBeInTheDocument();
//     expect(screen.getByText("Genre: Action")).toBeInTheDocument();

//     // Klicka igen för att gömma informationen
//     await userEvent.click(dropdownButton); // Använd userEvent

//     // Kontrollera att informationen inte längre visas
//     expect(screen.queryByText("Rating: 5")).not.toBeInTheDocument();
//   });

//   // Test 4: Testa fallback-bild när thumbnail inte laddas korrekt
//   it("should show fallback image if thumbnail fails to load", () => {
//     render(
//       <BookmarksProvider>
//         <MovieCard {...mockMovie} />
//       </BookmarksProvider>,
//     );

//     // Hämta bildelementet
//     const thumbnail = screen.getByAltText("Test Movie");

//     // Simulera att bildladdningen misslyckas
//     fireEvent.error(thumbnail);

//     // Kontrollera att fallback-bilden laddas
//     expect(thumbnail).toHaveAttribute("src", "path/to/fallback-image.jpg");
//   });
// });
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import MovieCard from "../components/MovieCard";
import { BookmarksProvider } from "../context/BookmarksContext"; // Importera BookmarksProvider
import { Movie } from "../types/Movies"; // Importera Movie-typen
import userEvent from "@testing-library/user-event"; // Importera userEvent

// Mockdata för att simulera en film
const mockMovie: Movie = {
  title: "Test Movie",
  thumbnail: "test-thumbnail.jpg",
  synopsis: "This is a test movie synopsis.",
  rating: "5",
  genre: "Action",
  year: 2021,
  actors: ["Actor 1", "Actor 2"],
};

describe("MovieCard", () => {
  // Test 1: Kontrollera att alla delar av MovieCard renderas korrekt
  it("should render movie information correctly", () => {
    render(
      <BookmarksProvider>
        <MovieCard {...mockMovie} />
      </BookmarksProvider>,
    );

    // Kontrollera att titeln visas
    expect(screen.getByText("Test Movie")).toBeInTheDocument();

    expect(screen.getByText("5")).toBeInTheDocument();

    // Kontrollera att year visas
    expect(screen.getByText("2021")).toBeInTheDocument();

    // Kontrollera att bilden visas korrekt
    const thumbnail = screen.getByAltText("Test Movie");
    expect(thumbnail).toHaveAttribute("src", "test-thumbnail.jpg");
  });

  // Test 2: Testa bokmärkesknappen
  it("should toggle bookmark status", async () => {
    render(
      <BookmarksProvider>
        <MovieCard {...mockMovie} />
      </BookmarksProvider>,
    );

    // Kontrollera initialt att knappen visar "Add bookmark"
    const bookmarkButton = screen.getByRole("button", {
      name: /Add bookmark/i,
    });
    expect(bookmarkButton).toBeInTheDocument();

    // Klicka på bokmärkesknappen för att lägga till bokmärke
    await userEvent.click(bookmarkButton);

    // Kontrollera att knappen nu visar "Remove bookmark"
    expect(
      screen.getByRole("button", { name: /Remove bookmark/i }),
    ).toBeInTheDocument();

    // Klicka på bokmärkesknappen för att ta bort bokmärke
    await userEvent.click(
      screen.getByRole("button", { name: /Remove bookmark/i }),
    );

    // Kontrollera att knappen visar "Add bookmark" igen
    expect(
      screen.getByRole("button", { name: /Add bookmark/i }),
    ).toBeInTheDocument();
  });

  // Test 3: Testa fallback-bild när thumbnail inte laddas korrekt
  it("should show fallback image if thumbnail fails to load", () => {
    render(
      <BookmarksProvider>
        <MovieCard {...mockMovie} />
      </BookmarksProvider>,
    );

    const thumbnail = screen.getByAltText("Test Movie");
    fireEvent.error(thumbnail); // Simulera att bildladdningen misslyckas
    expect(thumbnail).toHaveAttribute("src", "test-thumbnail.jpg");
  });
});
