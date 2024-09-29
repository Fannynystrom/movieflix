import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import "@testing-library/jest-dom";

const mockData = [
  {
    title: "Movie 1",
    synopsis: "Synopsis 1",
    genre: "Genre 1",
    actors: ["Actor 1"],
  },
  {
    title: "Movie 2",
    synopsis: "Synopsis 2",
    genre: "Genre 2",
    actors: ["Actor 2"],
  },
];

describe("SearchBar Component", () => {
  test("renders the search icon", () => {
    render(<SearchBar data={mockData} />, { wrapper: BrowserRouter });
    expect(screen.getByTestId("search-icon")).toBeInTheDocument();
  });

  test("toggles the search field visibility when icon is clicked", () => {
    render(<SearchBar data={mockData} />, { wrapper: BrowserRouter });
    const searchIcon = screen.getByTestId("search-icon");
    fireEvent.click(searchIcon);
    expect(
      screen.getByPlaceholderText("Sök filmer...").closest("div"),
    ).toHaveClass("active");
    fireEvent.click(searchIcon);
    expect(
      screen.getByPlaceholderText("Sök filmer...").closest("div"),
    ).not.toHaveClass("active");
  });

  test("search results are empty initially", () => {
    render(<SearchBar data={mockData} />, { wrapper: BrowserRouter });
    expect(screen.queryByRole("list")).not.toBeInTheDocument();
  });

  test("shows correct results on search", () => {
    render(<SearchBar data={mockData} />, { wrapper: BrowserRouter });
    const searchInput = screen.getByPlaceholderText("Sök filmer...");
    fireEvent.change(searchInput, { target: { value: "Movie 1" } });
    expect(screen.getByText("Movie 1")).toBeInTheDocument();
  });

  test("displays up to 8 search results", () => {
    const extendedData = [...Array(10).keys()].map((i) => ({
      title: `Movie ${i + 1}`,
      synopsis: `Synopsis ${i + 1}`,
      genre: `Genre ${i + 1}`,
      actors: [`Actor ${i + 1}`],
    }));

    render(<SearchBar data={extendedData} />, { wrapper: BrowserRouter });
    const searchInput = screen.getByPlaceholderText("Sök filmer...");
    fireEvent.change(searchInput, { target: { value: "Movie" } });

    const listItems = screen.getAllByRole("listitem");
    expect(listItems.length).toBe(8);
  });
});
