import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './redux/store/configureStore';
import App from './App';
import { createRoot } from 'react-dom/client'; 

const root = document.getElementById('root');

createRoot(root).render( 
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
