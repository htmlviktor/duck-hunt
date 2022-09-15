import React from 'react';
import ReactDOM from 'react-dom/client';

import { Provider } from 'react-redux';
import App from './components/app/App';

import store from './logic/store';
import SocketProvider from './service/socket';

import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <SocketProvider>
        <App />
      </SocketProvider>
    </Provider>
  </React.StrictMode>,
);
