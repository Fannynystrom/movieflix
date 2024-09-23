import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navigation from "./navigation/Navigate";

const App: React.FC = () => {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<h1>Home Page</h1>} />
        <Route path="/trending" element={<h1>Trending</h1>} />
        <Route path="/recommended" element={<h1>Recommended for You</h1>} />
      </Routes>
    </Router>
  );
};

export default App;
