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
import CategoriesPage from "./screens/Categories";
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
        <Route path="/" element={<Home />} />
        <Route path="/categories" element={<Categories />} />

        <Route path="/bookmarked" element={<BookMarked />} />
      </Routes>
    </>
  );
};

export default AppRouter;
