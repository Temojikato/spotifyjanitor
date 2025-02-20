import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Callback from './pages/Callback';
import SavedTracksPage from './pages/SavedTracksPage';
import SearchModal from './components/SearchModal';
import ProtectedRoute from './components/ProtectedRoute';
import HomeRedirect from './components/HomeRedirect';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/callback" element={<Callback />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/saved-tracks"
          element={
            <ProtectedRoute>
              <SavedTracksPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/search"
          element={
            <ProtectedRoute>
              <SearchModal />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<HomeRedirect />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
