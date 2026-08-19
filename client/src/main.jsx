import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AuthProvider from './context/AuthProvider.jsx';
import './index.css'
import App from './App.jsx'
import ToastProvider from './context/ToastProvider.jsx';
import UserEntriesProvider from './context/UserEntriesProvider.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <ToastProvider>
        <UserEntriesProvider>
          <App />
        </UserEntriesProvider>
      </ToastProvider>
    </AuthProvider>
  </StrictMode>,
)