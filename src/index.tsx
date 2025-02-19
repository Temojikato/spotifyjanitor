import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(
    <>
      <App />
      <ToastContainer position="top-center" autoClose={3000} aria-label={undefined} />
    </>
  );
}
