import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {CookiesProvider} from 'react-cookie';
import './App.css';
import App from './App.jsx'
import { Store } from './store/store.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <CookiesProvider>
  <Store>
    <App />
  </Store>
    </CookiesProvider>
  </StrictMode>,
)
