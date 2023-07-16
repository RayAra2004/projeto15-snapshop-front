import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import ResetStyle from './Styles/resetStyle.js';
import { GoogleOAuthProvider } from '@react-oauth/google';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <GoogleOAuthProvider clientId={import.meta.env.VITE_KEY}>
      <ResetStyle />
      <App />
      </GoogleOAuthProvider>
  </React.StrictMode>
)
