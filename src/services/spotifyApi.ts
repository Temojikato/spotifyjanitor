import axios from 'axios';
import localforage from 'localforage';

const API_BASE = 'https://api.spotify.com/v1';
const getAccessToken = (): string | null => localStorage.getItem('access_token');

export const getUserSavedTracks = async (): Promise<any> => {
  const cachedTracks = await localforage.getItem('savedTracks');
  if (cachedTracks) return cachedTracks;
  const token = getAccessToken();
  if (!token) throw new Error('No access token available');
  const response = await axios.get(`${API_BASE}/me/tracks`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  await localforage.setItem('savedTracks', response.data);
  return response.data;
};

export const removeUserSavedTrack = async (trackId: string): Promise<void> => {
  const token = getAccessToken();
  if (!token) throw new Error('No access token available');
  await axios.delete(`${API_BASE}/me/tracks`, {
    headers: { Authorization: `Bearer ${token}` },
    data: { ids: [trackId] }
  });
  await localforage.removeItem('savedTracks');
};

export const saveUserTrack = async (trackId: string): Promise<void> => {
  const token = getAccessToken();
  if (!token) throw new Error('No access token available');
  await axios.put(`${API_BASE}/me/tracks`, null, {
    headers: { Authorization: `Bearer ${token}` },
    params: { ids: trackId }
  });
  await localforage.removeItem('savedTracks');
};

export const searchTracks = async (query: string): Promise<any> => {
  const token = getAccessToken();
  if (!token) throw new Error('No access token available');
  const response = await axios.get(`${API_BASE}/search`, {
    headers: { Authorization: `Bearer ${token}` },
    params: { q: query, type: 'track', limit: 20 }
  });
  return response.data;
};
