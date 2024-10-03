// src/AppRouter.tsx
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
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
  return isAuthenticated ? element : <Navigate to="/login" replace />;
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
      {/* Bakgrundsvideon visas alltid */}
      <BackgroundVideo />
      {/* Navigation visas endast om användaren är autentiserad */}
      {isAuthenticated && <Navigation />}
      <Routes>
        {/* Login-sidan */}
        <Route path="/login" element={<Login />} />
        {/* Skyddade rutter */}
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
        {/* Hantera icke-definierade rutter */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

export default AppRouter;
