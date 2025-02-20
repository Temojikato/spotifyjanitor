import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders app header and login button', () => {
  render(<App />);
  expect(screen.getByText(/spotify janitor/i)).toBeInTheDocument();
  expect(screen.getByText(/login with spotify/i)).toBeInTheDocument();
});

