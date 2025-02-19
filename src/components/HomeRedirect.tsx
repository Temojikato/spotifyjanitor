import React from 'react';
import { Navigate } from 'react-router-dom';

const HomeRedirect: React.FC = () => {
  const token = localStorage.getItem('access_token');
  return token ? <Navigate to="/saved-tracks" replace /> : <Navigate to="/login" replace />;
};

export default HomeRedirect;
