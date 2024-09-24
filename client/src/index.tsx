import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app';
import { Toaster } from 'react-hot-toast';

const rootElement = document.getElementById('root');

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
      <Toaster position="bottom-right" />
    </React.StrictMode>
  );
}