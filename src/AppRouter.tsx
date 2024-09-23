import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navigation from './navigation/Navigate';  
import Home from './screens/Home';  
import BookMarked from './screens/Bookmarked';  
//import Admin from './screens/Admin';  
//import MovieView from './screens/MovieView';  

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Navigation /> 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bookmarked" element={<BookMarked />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
