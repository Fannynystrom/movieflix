import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import { describe, it, expect } from "vitest";
import { Movie } from "../types/Movies";
import { BookmarksProvider } from "../context/BookmarksContext";

// Använd typad mockdata
const mockData: Movie[] = [
  {
    title: "Movie 1",
    synopsis: "Synopsis 1",
    genre: "Genre 1",
    actors: ["Actor 1"],
    thumbnail: "thumbnail1.jpg",
    year: 2021,
    rating: "5",
  },
  {
    title: "Movie 2",
    synopsis: "Synopsis 2",
    genre: "Genre 2",
    actors: ["Actor 2"],
    thumbnail: "thumbnail2.jpg",
    year: 2020,
    rating: "4",
  },
];

// Testa SearchBar-komponenten
describe("SearchBar Component", () => {
  // Test 1: Kontrollera att sökikonen renderas korrekt
  it("renderar sökikonen", () => {
    render(<SearchBar data={mockData} />, { wrapper: BrowserRouter });
    expect(screen.getByTestId("search-icon")).toBeInTheDocument();
  });

  // Test 2: Testa att sökfältets synlighet växlar när ikonen klickas
  it("växlar synligheten för sökfältet när ikonen klickas", async () => {
    render(<SearchBar data={mockData} />, { wrapper: BrowserRouter });
    const searchIcon = screen.getByTestId("search-icon");

    // Använd userEvent för att simulera klick
    await userEvent.click(searchIcon);
    expect(
      screen.getByPlaceholderText("Sök filmer...").closest("div"),
    ).toHaveClass("active");

    // Klicka igen för att stänga
    await userEvent.click(searchIcon);
    expect(
      screen.getByPlaceholderText("Sök filmer...").closest("div"),
    ).not.toHaveClass("active");
  });

  // Test 3: Kontrollera att inga sökresultat visas initialt
  it("visar inga sökresultat initialt", () => {
    render(<SearchBar data={mockData} />, { wrapper: BrowserRouter });
    // Kontrollera att det inte finns någon lista med sökresultat
    expect(screen.queryByRole("list")).not.toBeInTheDocument();
  });

  // Test 4: Testa att korrekta resultat visas vid sökning
  it("visar korrekta resultat vid sökning", async () => {
    render(<SearchBar data={mockData} />, { wrapper: BrowserRouter });
    const searchInput = screen.getByPlaceholderText("Sök filmer...");

    // Använd userEvent för att simulera sökning
    await userEvent.type(searchInput, "Movie 1");

    // Kontrollera att "Movie 1" visas i sökresultaten
    expect(screen.getByText("Movie 1")).toBeInTheDocument();
  });

  // Test 5: Kontrollera att maximalt 8 sökresultat visas
  it("visar maximalt 8 sökresultat", async () => {
    const extendedData: Movie[] = [...Array(10).keys()].map((i) => ({
      title: `Movie ${i + 1}`,
      synopsis: `Synopsis ${i + 1}`,
      genre: `Genre ${i + 1}`,
      actors: [`Actor ${i + 1}`],
      thumbnail: `thumbnail${i + 1}.jpg`,
      year: 2010 + i,
      rating: `${i + 1}`,
    }));

    render(<SearchBar data={extendedData} />, { wrapper: BrowserRouter });
    const searchInput = screen.getByPlaceholderText("Sök filmer...");

    // Använd userEvent för att simulera sökning
    await userEvent.type(searchInput, "Movie");

    // Kontrollera att endast 8 resultat visas, även om det finns fler filmer
    const listItems = screen.getAllByRole("listitem");
    expect(listItems.length).toBe(8);
  });

  // Test 6: Kontrollera att inga resultat visas om söksträngen raderas
  it("visar inga resultat om söksträngen raderas", async () => {
    render(<SearchBar data={mockData} />, { wrapper: BrowserRouter });
    const searchInput = screen.getByPlaceholderText("Sök filmer...");

    // Skriv in en söksträng
    await userEvent.type(searchInput, "Movie 1");
    expect(screen.getByText("Movie 1")).toBeInTheDocument();

    // Rensa söksträngen
    await userEvent.clear(searchInput);
    expect(screen.queryByText("Movie 1")).not.toBeInTheDocument();
  });

  // Test 7: Testa att söka korrekt på synopsis och genre
  it("söker korrekt på synopsis och genre", async () => {
    render(<SearchBar data={mockData} />, { wrapper: BrowserRouter });
    const searchInput = screen.getByPlaceholderText("Sök filmer...");

    // Sök efter film baserat på synopsis
    await userEvent.type(searchInput, "Synopsis 2");
    expect(screen.getByText("Movie 2")).toBeInTheDocument();

    // Rensa och sök efter film baserat på genre
    await userEvent.clear(searchInput);
    await userEvent.type(searchInput, "Genre 1");
    expect(screen.getByText("Movie 1")).toBeInTheDocument();
  });

  // Test 8: Kontrollera att modalen öppnas när en film klickas
  it("öppnar modalen när en film klickas", async () => {
    render(
      <BookmarksProvider>
        <SearchBar data={mockData} />
      </BookmarksProvider>,
      { wrapper: BrowserRouter },
    );

    const searchInput = screen.getByPlaceholderText("Sök filmer...");

    // Sök efter en film
    await userEvent.type(searchInput, "Movie 1");
    const movieResult = screen.getByText("Movie 1");

    // Klicka på filmen
    await userEvent.click(movieResult);

    // Kontrollera att modalen visas med den valda filmen
    expect(screen.getByText("Synopsis 1")).toBeInTheDocument(); // Kontrollera en specifik del av modalinnehållet
  });

  // Test 9: Testa att inga resultat visas om sökningen inte matchar något
  it("visar inga resultat om sökningen inte matchar något", async () => {
    render(<SearchBar data={mockData} />, { wrapper: BrowserRouter });
    const searchInput = screen.getByPlaceholderText("Sök filmer...");

    // Simulera en sökning med en sträng som inte finns
    await userEvent.type(searchInput, "Nonexistent Movie");

    // Kontrollera att inga resultat visas
    expect(screen.queryByRole("list")).not.toBeInTheDocument();
  });
});
