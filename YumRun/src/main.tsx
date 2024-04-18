import React from 'react'
import ReactDOM from 'react-dom/client'
import './global.css'
import { BrowserRouter as Router } from 'react-router-dom'
import AppRoutes from './AppRoutes'
import { Toaster } from './components/ui/sonner'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <AppRoutes />
      <Toaster visibleToasts={1} position='top-right' richColors />
    </Router>
  </React.StrictMode>,
)
