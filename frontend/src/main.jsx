import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Auth0Provider } from '@auth0/auth0-react';
import { BrowserRouter } from 'react-router-dom';



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Auth0Provider
      domain="dev-lzivcdxx75bygd3q.us.auth0.com"
      clientId="saIUajoDPRSW3cUlTStgCjZCvW5sSBPx"
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: "this is unique identifier",
        scope: "openid profile email"
      }}
    >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Auth0Provider>
  </StrictMode>
)
