import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import ResetStyle from './Styles/resetStyle.js'
import { GoogleOAuthProvider } from '@react-oauth/google'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <GoogleOAuthProvider clientId="688980860721-dlamsl8nlsrat663u22nrb6bqo253nuj.apps.googleusercontent.com">
      <ResetStyle />
      <App />
      </GoogleOAuthProvider>
  </React.StrictMode>
)
