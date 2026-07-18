import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { DrawerProvider } from './context/DrawerContext'
import { LanguageProvider } from './context/LanguageContext'
import { UserProvider } from './context/UserContext'
import { TaskProvider } from './context/TaskContext'

// Initialize theme from localStorage on load
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  document.documentElement.setAttribute('data-theme', 'dark');
} else {
  document.documentElement.removeAttribute('data-theme');
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
      <TaskProvider>
        <LanguageProvider>
          <DrawerProvider>
            <App />
          </DrawerProvider>
        </LanguageProvider>
      </TaskProvider>
    </UserProvider>
  </StrictMode>,
)

