import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import UserProvider from "./UserContext";
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <GoogleOAuthProvider clientId="404823727594-1r97duv417cgnhd5hs6g37i3s97s0bau.apps.googleusercontent.com">
  <UserProvider>
  <React.StrictMode>
    <App />
  </React.StrictMode>
   </UserProvider>
   </GoogleOAuthProvider>
);