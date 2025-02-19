import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getToken } from '../services/auth';
import axios from 'axios';

const Callback: React.FC = () => {
  const navigate = useNavigate();

  const fetchAndCacheProfile = async () => {
    const token = localStorage.getItem('access_token');
    if (!token) return;
    try {
      const response = await axios.get('https://api.spotify.com/v1/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      localStorage.setItem('user_profile', JSON.stringify(response.data));
      if (response.data.images && response.data.images.length > 0) {
        localStorage.setItem('profile_pic', response.data.images[0].url);
      }
    } catch (error) {
      console.error('Failed to fetch user profile', error);
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    if (code) {
      getToken(code)
        .then(() => fetchAndCacheProfile())
        .then(() => {
          navigate('/saved-tracks');
        })
        .catch(err => {
          console.error('Failed to obtain token', err);
        });
    } else {
      console.error('Authorization code not found in URL');
    }
  }, [navigate]);

  return <div>Loading authentication details...</div>;
};

export default Callback;
