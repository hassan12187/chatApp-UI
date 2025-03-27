import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {CookiesProvider} from 'react-cookie';
import './App.css';
import App from './App.jsx'
import { Store } from './store/store.jsx';
import {QueryClient,QueryClientProvider} from '@tanstack/react-query';
import {ReactQueryDevtools} from '@tanstack/react-query-devtools';

const queryClient = new QueryClient();
createRoot(document.getElementById('root')).render(
  <StrictMode>
  <CookiesProvider>
  <QueryClientProvider client={queryClient}>
  <Store>
    <App />
  </Store>
  <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
    </CookiesProvider>
  </StrictMode>,
)
