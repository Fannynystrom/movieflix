// src/AppRouter.tsx
import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./AuthContext";
import { BookmarksProvider } from "./context/BookmarksContext";
import Navigation from "./navigation/Navigate";
import Login from "./screens/Login";
import BookMarkedScreen from "./screens/BookmarkedScreen";
import CategoriesScreen from "./screens/CategoriesScreen";
import MovieFlixScreen from "./screens/MovieFlixScreen";
import BackgroundVideo from "./components/BackgroundsVideo";
import "./styles/App.css";

const ProtectedRoute: React.FC<{ element: JSX.Element }> = ({ element }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? element : <Navigate to="/login" />;
};

const AppRouter: React.FC = () => {
  return (
    <AuthProvider>
      <BookmarksProvider>
        <Router>
          <AppContent />
        </Router>
      </BookmarksProvider>
    </AuthProvider>
  );
};

const AppContent: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <>
      <BackgroundVideo />
      {isAuthenticated && <Navigation />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={<ProtectedRoute element={<MovieFlixScreen />} />}
        />
        <Route
          path="/categoriesscreen"
          element={<ProtectedRoute element={<CategoriesScreen />} />}
        />
        <Route
          path="/bookmarked"
          element={<ProtectedRoute element={<BookMarkedScreen />} />}
        />
      </Routes>
    </>
  );
};

export default AppRouter;
