import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './App.jsx'
import LoginComponent from './components/LoginComponent.jsx'
import AuthProvider from './contexts/AuthProvider.jsx'
import UsersDisplay from "./components/UsersDisplay.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <UsersDisplay />
      <LoginComponent />
    </AuthProvider>
  </StrictMode>,
)
