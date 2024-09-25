import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./AuthContext";
import Navigation from "./navigation/Navigate";
import Login from "./screens/Login";
import Home from "./screens/Home";
import BookMarked from "./screens/Bookmarked";
import Categories from "./screens/Categories";
import TrendingCarousel from "./screens/TrendingCarousel";
//import Admin from './screens/Admin';
//import MovieView from './screens/MovieView';

const ProtectedRoute: React.FC<{ component: React.FC }> = ({
  component: Component,
}) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Component /> : <Navigate to="/login" />;
};

const AppRouter: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
};

const AppContent: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <>
      {isAuthenticated && <Navigation />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<ProtectedRoute component={Home} />} />
        <Route
          path="/categories"
          element={<ProtectedRoute component={Categories} />}
        />
        <Route
          path="/trendingcarousel"
          element={<ProtectedRoute component={TrendingCarousel} />}
        />
        <Route
          path="/bookmarked"
          element={<ProtectedRoute component={BookMarked} />}
        />
      </Routes>
    </>
  );
};

export default AppRouter;
