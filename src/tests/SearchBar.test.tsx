import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event"; // Använd userEvent istället för fireEvent
import { BrowserRouter } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import { describe, it, expect } from "vitest";
import { Movie } from "../types/Movies"; // Importera din Movie-typ

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

describe("SearchBar Component", () => {
  it("renderar sökikonen", () => {
    render(<SearchBar data={mockData} />, { wrapper: BrowserRouter });
    expect(screen.getByTestId("search-icon")).toBeInTheDocument();
  });

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

  it("visar inga sökresultat initialt", () => {
    render(<SearchBar data={mockData} />, { wrapper: BrowserRouter });
    // Kontrollera att det inte finns någon lista med sökresultat
    expect(screen.queryByRole("list")).not.toBeInTheDocument();
  });

  it("visar korrekta resultat vid sökning", async () => {
    render(<SearchBar data={mockData} />, { wrapper: BrowserRouter });
    const searchInput = screen.getByPlaceholderText("Sök filmer...");

    // Använd userEvent för att simulera sökning
    await userEvent.type(searchInput, "Movie 1");

    // Kontrollera att "Movie 1" visas i sökresultaten
    expect(screen.getByText("Movie 1")).toBeInTheDocument();
  });

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
});
