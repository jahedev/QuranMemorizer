import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
export const UserContext = React.createContext(null)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserContext.Provider value={{ pages_location: 'https://jahedev.github.io/tajweed-quran-pages/hafs/' }}>
    <App />
    </UserContext.Provider>
  </React.StrictMode>,
)
