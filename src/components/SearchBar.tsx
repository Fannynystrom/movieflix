import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import Fuse from "fuse.js";
import { Link } from "react-router-dom";

interface Movie {
  title: string;
  synopsis: string;
  genre: string;
  actors: string[];
}

interface SearchBarProps {
  data: Movie[];
}

const SearchBar: React.FC<SearchBarProps> = ({ data }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<Movie[]>([]);
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const fuse = new Fuse<Movie>(data, {
    keys: ["title", "synopsis", "genre", "actors"],
    threshold: 0.3,
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query) {
      const fuzzyResults = fuse.search(query);
      setResults(fuzzyResults.map((result) => result.item));
    } else {
      setResults([]);
    }
  };

  return (
    <div className="search-container">
      <FaSearch
        size={24}
        className="search-icon"
        onClick={() => setIsSearchVisible(!isSearchVisible)}
        data-testid="search-icon"
      />
      <div className={`search-field ${isSearchVisible ? "active" : ""}`}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Sök filmer..."
        />
        {results.length > 0 && (
          <ul className="search-results">
            {results.slice(0, 8).map((result, index) => (
              <li key={index}>
                <Link to={`/movie/${result.title}`}>{result.title}</Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
