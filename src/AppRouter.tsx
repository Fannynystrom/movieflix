import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navigation from './navigation/Navigate';  
import Home from './screens/Home';  
import Categories from './screens/Categories';  
import Preview from './screens/Preview';  

const AppRouter = () => {
  return (
    <Router>
      <Navigation /> 
      <Routes>
        <Route path="/" element={<Home />} />  
        <Route path="/Categories" element={<Categories />} />  
        <Route path="/preview" element={<Preview />} />  
      </Routes>
    </Router>
  );
};

export default AppRouter;
