import React from "react";
import { Link } from "react-router-dom";
import { FaBookmark } from "react-icons/fa";

import "../styles/Navigation.css";

const Navigate: React.FC = () => {
  return (
    <nav className="navbar">
      <Link to="/">Startsida</Link>
      <Link to="/catogories">Kategorier</Link>
      <Link to="/trendingcarousel">Trending</Link>
      <Link to="/recommendedcarousel">Recommended</Link>
      <Link to="/bookmarked" className="bookmark-icon">
        <FaBookmark size={24} />
      </Link>
    </nav>
  );
};

export default Navigate;
