import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './App.jsx'
import LoginComponent from './components/LoginComponent.jsx'
import AuthProvider from './contexts/AuthProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <LoginComponent />
    </AuthProvider>
  </StrictMode>,
)
