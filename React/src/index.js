import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import decode from 'jwt-decode';
import setAuth from './helpers/setAuthorization';
import * as types from './redux/types';
import App from './App';
import store from './redux/store';
import './styles/index.scss';

if (localStorage.mTracker) {
  const token = localStorage.getItem('mTracker');
  const { exp } = decode(token);
  const currentTime = Math.floor(Date.now() / 1000);
  if (exp > currentTime) {
    setAuth(token);
    store.dispatch({ type: types.SAVE_USER_TOKEN, payload: token });
  }
}

render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root'),
);
