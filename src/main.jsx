import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './App.css';
import App from './App.jsx'
import { Store } from './store/store.jsx';
import {QueryClient,QueryClientProvider} from '@tanstack/react-query';
import {ReactQueryDevtools} from '@tanstack/react-query-devtools';
import {ToastContainer} from 'react-toastify';

const queryClient = new QueryClient();
createRoot(document.getElementById('root')).render(
  <StrictMode>
  <QueryClientProvider client={queryClient}>
  <Store>
    <App />
    <ToastContainer
position="top-right"
autoClose={3000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick={false}
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
// transition={Bounce}
/>
  </Store>
  <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
  </StrictMode>,
)
