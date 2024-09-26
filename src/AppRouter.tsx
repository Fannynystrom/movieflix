import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './AuthContext';
import { BookmarksProvider } from './context/BookmarksContext'; // Import the BookmarksProvider
import Navigation from './navigation/Navigate';
import Login from './screens/Login';
import Home from './screens/Home';
import BookMarkedScreen from './screens/BookmarkedScreen';
import Categories from './screens/Categories';
import TrendingCarousel from './screens/TrendingCarousel';

const ProtectedRoute: React.FC<{ component: React.FC }> = ({ component: Component }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Component /> : <Navigate to="/login" />;
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
      {isAuthenticated && <Navigation />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<ProtectedRoute component={Home} />} />
        <Route path="/categories" element={<ProtectedRoute component={Categories} />} />
        <Route path="/trendingcarousel" element={<ProtectedRoute component={TrendingCarousel} />} />
        <Route
  path="/bookmarked"
  element={<ProtectedRoute component={BookMarkedScreen} />}
/>
      </Routes>
    </>
  );
};

export default AppRouter;
