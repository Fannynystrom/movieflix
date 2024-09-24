import React from "react";
import { Link } from "react-router-dom"; // Om du använder React Router för navigation

const Navigation: React.FC = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold">MovieApp</div>
        <ul className="hidden md:flex space-x-4">
          <li>
            <Link to="/" className="text-white">
              Home
            </Link>
          </li>
          <li>
            <Link to="/trending" className="text-white">
              Trending
            </Link>
          </li>
          <li>
            <Link to="/recommended" className="text-white">
              Recommended
            </Link>
          </li>
        </ul>
        <button className="md:hidden text-white">Menu</button>
      </div>
    </nav>
  );
};

export default Navigation;
