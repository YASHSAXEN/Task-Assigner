import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ContextProvider from './store/ContextProvider.jsx'
import { Toaster } from 'react-hot-toast';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ContextProvider>
      <App />
      <Toaster />
    </ContextProvider>
  </StrictMode>,
)
