import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { DataProvider } from './context/data.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <DataProvider>

  <React.StrictMode>
    <App />
  </React.StrictMode>
  </DataProvider>
)
