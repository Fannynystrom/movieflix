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
import Home from "./screens/Home";
import BookMarkedScreen from "./screens/BookmarkedScreen";
import CategoriesScreen from "./screens/CategoriesScreen"; // Importera din nya komponent
import TrendingCarousel from "./screens/TrendingCarousel";
import RecommendedCarousel from "./screens/RecommendedCarousel";
import { Movie } from "../src/types/Movies";

const ProtectedRoute: React.FC<{ element: JSX.Element }> = ({ element }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? element : <Navigate to="/login" />;
};

const AppRouter: React.FC = () => {
  // Sätt rätt typ på trendingMovies
  const trendingMovies: Movie[] = []; // Här skulle du hämta filmer från din databas eller API

  return (
    <AuthProvider>
      <BookmarksProvider>
        <Router>
          <AppContent trendingMovies={trendingMovies} />
        </Router>
      </BookmarksProvider>
    </AuthProvider>
  );
};

interface AppContentProps {
  trendingMovies: Movie[]; // Använd Movie-typen här
}

const AppContent: React.FC<AppContentProps> = ({ trendingMovies }) => {
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
          element={<ProtectedRoute element={<TrendingCarousel />} />}
        />
        <Route
          path="/recommendedcarousel"
          element={
            <ProtectedRoute
              element={<RecommendedCarousel trendingMovies={trendingMovies} />} // Skicka props
            />
          }
        />
         <Route
          path="/categoriesscreen"
          element={<ProtectedRoute component={CategoriesScreen} />} // Använd CategoriesScreen här
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
