import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './pages/App.tsx'
import NavBar from './component/Navbar.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <NavBar/>
    <App />
  </StrictMode>,
)
