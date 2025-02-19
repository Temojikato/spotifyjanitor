export const generateRandomString = (length: number): string => {
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const randomValues = new Uint8Array(length);
  window.crypto.getRandomValues(randomValues);
  return Array.from(randomValues)
    .map(val => possible[val % possible.length])
    .join('');
};

export const sha256 = async (plain: string): Promise<ArrayBuffer> => {
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);
  return window.crypto.subtle.digest('SHA-256', data);
};

export const base64encode = (buffer: ArrayBuffer): string => {
  const bytes = new Uint8Array(buffer);
  const binary = Array.from(bytes).map(byte => String.fromCharCode(byte)).join('');
  return btoa(binary)
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
};

export const generateCodeChallenge = async (codeVerifier: string): Promise<string> => {
  const hashed = await sha256(codeVerifier);
  return base64encode(hashed);
};

export const redirectToSpotifyAuth = async (): Promise<void> => {
  const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID || '';
  const redirectUri =
    process.env.REACT_APP_SPOTIFY_REDIRECT_URI?.trim() || `${window.location.origin}/callback`;
  const scope = 'user-read-private user-read-email user-library-read user-library-modify';
  const codeVerifier = generateRandomString(64);
  localStorage.setItem('code_verifier', codeVerifier);
  const codeChallenge = await generateCodeChallenge(codeVerifier);
  const authUrl = new URL('https://accounts.spotify.com/authorize');
  const params = {
    response_type: 'code',
    client_id: clientId,
    scope,
    code_challenge_method: 'S256',
    code_challenge: codeChallenge,
    redirect_uri: redirectUri,
  };
  authUrl.search = new URLSearchParams(params).toString();
  window.location.href = authUrl.toString();
};

export const getToken = async (code: string): Promise<any> => {
  const codeVerifier = localStorage.getItem('code_verifier');
  const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID || '';
  const redirectUri =
    process.env.REACT_APP_SPOTIFY_REDIRECT_URI?.trim() || `${window.location.origin}/callback`;
  const body = new URLSearchParams({
    client_id: clientId,
    grant_type: 'authorization_code',
    code,
    redirect_uri: redirectUri,
    code_verifier: codeVerifier || '',
  });
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString(),
  });
  const data = await response.json();
  localStorage.setItem('access_token', data.access_token);
  if (data.expires_in) {
    const expiry = Date.now() + data.expires_in * 1000;
    localStorage.setItem('token_expiry', expiry.toString());
  }
  if (data.refresh_token) {
    localStorage.setItem('refresh_token', data.refresh_token);
  }
  return data;
};

export const refreshAccessToken = async (): Promise<any> => {
  const refreshToken = localStorage.getItem('refresh_token');
  if (!refreshToken) throw new Error('No refresh token available');
  const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID || '';
  const body = new URLSearchParams({
    client_id: clientId,
    grant_type: 'refresh_token',
    refresh_token: refreshToken,
  });
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString(),
  });
  if (!response.ok) {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('token_expiry');
    throw new Error('Refresh token revoked or invalid');
  }
  const data = await response.json();
  localStorage.setItem('access_token', data.access_token);
  if (data.expires_in) {
    const expiry = Date.now() + data.expires_in * 1000;
    localStorage.setItem('token_expiry', expiry.toString());
  }
  return data;
};
