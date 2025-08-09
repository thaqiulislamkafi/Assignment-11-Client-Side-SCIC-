import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider } from 'react-router'
import router from './router.jsx'
import AuthProvider from './Components/Provider/AuthProvider.jsx'
import { HelmetProvider } from 'react-helmet-async'

createRoot(document.getElementById('root')).render(
  <HelmetProvider>
   <AuthProvider><RouterProvider router={router}></RouterProvider></AuthProvider>
  </HelmetProvider>,
)
