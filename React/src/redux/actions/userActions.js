import axios from 'axios';
import setAuth from '../../helpers/setAuthorization';
import * as types from '../types';

const login = details => dispatch =>
  axios.post(`${process.env.BASE_URL}/auth/login`, details).then((res) => {
    setAuth(res.data.token);
    localStorage.setItem('mTracker', res.data.token);
    dispatch({ type: types.SAVE_USER_TOKEN, payload: res.data.token });
  });

const register = details => dispatch =>
  axios.post(`${process.env.BASE_URL}/auth/signup`, details).then((res) => {
    setAuth(res.data.token);
    localStorage.setItem('mTracker', res.data.token);
    dispatch({ type: types.SAVE_USER_TOKEN, payload: res.data.token });
  });

const logOut = () => (dispatch) => {
  setAuth();
  localStorage.removeItem('mTracker');
  dispatch({ type: types.LOG_OUT });
};

export { login, register, logOut };
