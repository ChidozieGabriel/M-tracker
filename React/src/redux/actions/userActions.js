import axios from 'axios';
import * as types from '../types';

export const login = details => dispatch =>
  axios.post(`${process.env.BASE_URL}/auth/login`, details).then((res) => {
    localStorage.setItem('mTracker', res.data.token);
    dispatch({ type: types.SAVE_USER_TOKEN, payload: res.data.token });
  });

export const register = details => dispatch =>
  axios.post(`${process.env.BASE_URL}/auth/signup`, details).then((res) => {
    localStorage.setItem('mTracker', res.data.token);
    dispatch({ type: types.SAVE_USER_TOKEN, payload: res.data.token });
  });

export const logOut = () => (dispatch) => {
  localStorage.removeItem('mTracker');
  dispatch({ type: types.LOG_OUT });
};
