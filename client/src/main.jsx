import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import Posts from './posts/Posts';
import store from './app/store';
import './index.scss';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <Posts />
    </Provider>
  </React.StrictMode>
);
