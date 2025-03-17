import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {CookiesProvider} from 'react-cookie';
import './App.css';
import App from './App.jsx'
import { Store } from './store/store.jsx';
import {QueryClient,QueryClientProvider} from 'react-query';

const queryClient = new QueryClient();
createRoot(document.getElementById('root')).render(
  <StrictMode>
  <CookiesProvider>
  <Store>
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
  </Store>
    </CookiesProvider>
  </StrictMode>,
)
