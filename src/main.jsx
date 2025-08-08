import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import AuthProvider from './contexts/AuthProvider.jsx';
import './index.css';
import { PatientProvider } from './contexts/PatientProvider.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <PatientProvider>           
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PatientProvider>
    </AuthProvider>
  </StrictMode>
);