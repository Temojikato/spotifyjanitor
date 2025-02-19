import React, { JSX, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { refreshAccessToken } from '../services/auth';

interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    const tokenExpiry = localStorage.getItem('token_expiry');
    if (token && tokenExpiry && Date.now() < Number(tokenExpiry)) {
      setAuthenticated(true);
      setLoading(false);
      return;
    }
    const refreshToken = localStorage.getItem('refresh_token');
    if (refreshToken) {
      refreshAccessToken()
        .then(() => {
          setAuthenticated(true);
          setLoading(false);
        })
        .catch(() => {
          setAuthenticated(false);
          setLoading(false);
        });
    } else {
      setAuthenticated(false);
      setLoading(false);
    }
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!authenticated) return <Navigate to="/" replace />;
  return children;
};

export default ProtectedRoute;
