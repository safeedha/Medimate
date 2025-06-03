import { createRoot } from 'react-dom/client';

import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { GoogleOAuthProvider } from '@react-oauth/google';

import { store} from './app/store'; 

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID
createRoot(document.getElementById('root')!).render(
     <GoogleOAuthProvider clientId={clientId}>
      <Provider store={store}>

            <App />
         
      </Provider>
  </GoogleOAuthProvider>
);
