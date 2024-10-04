import React from "react";
import { Link } from "react-router-dom";
import { FaBookmark } from "react-icons/fa";
import useFetchMovies from "../hooks/FetchMovies";
import SearchBar from "../components/SearchBar";
import "../styles/Navigation.css";
import LogoutComponent from "../components/LogoutComponent";

const Navigate: React.FC = () => {
  const { movies } = useFetchMovies();

  return (
    <nav className="navbar">
      <div>
        <Link to="/">MovieFlix</Link>
        <Link to="/categoriesscreen">Kategorier</Link>
      </div>
      <div className="icons">
        <SearchBar data={movies} />
        <Link to="/bookmarked" className="bookmark-icon">
          <FaBookmark size={24} />
        </Link>
        <LogoutComponent />
      </div>
    </nav>
  );
};

export default Navigate;
