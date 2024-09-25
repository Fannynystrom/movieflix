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

const ProtectedRoute: React.FC<{ element: React.ReactElement }> = ({
  element,
}) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? element : <Navigate to="/login" />;
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
        <Route path="/" element={<ProtectedRoute element={<Home />} />} />
        <Route
          path="/categories"
          element={<ProtectedRoute element={<Categories />} />}
        />
        <Route
          path="/bookmarked"
          element={<ProtectedRoute element={<BookMarked />} />}
        />
      </Routes>
    </>
  );
};

export default AppRouter;
