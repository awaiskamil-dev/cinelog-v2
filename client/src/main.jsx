import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AuthProvider from './context/AuthContext/AuthProvider.jsx';
import './index.css'
import App from './App.jsx'
import ToastProvider from './context/ToastContext/ToastProvider.jsx';
import UserEntriesProvider from './context/UserEntriesContext/UserEntriesProvider.jsx';
import ListEditorProvider from './context/ListEditorContext/ListEditorProvider.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <ListEditorProvider>
        <ToastProvider>
        <UserEntriesProvider>
          <App />
        </UserEntriesProvider>
      </ToastProvider>
      </ListEditorProvider>
    </AuthProvider>
  </StrictMode>,
)