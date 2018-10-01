import axios from 'axios';
import * as types from '../types';

const getRequest = payload => ({
  type: types.ALL_REQUESTS,
  payload,
});

const getSingleRequest = payload => ({
  type: types.SINGLE_REQUEST,
  payload,
});

const createRequest = payload => ({
  type: types.CREATE_REQUEST,
  payload,
});

const getAllRequests = () => dispatch =>
  axios
    .get(`${process.env.BASE_URL}/users/requests/`)
    .then(res => dispatch(getRequest(res.data.result)));

export const getASingleRequest = id => dispatch =>
  axios
    .get(`${process.env.BASE_URL}/users/requests/${id}`)
    .then(res => dispatch(getSingleRequest(res.data.result)));
export const createRequestAction = detail => dispatch =>
  axios.post(`${process.env.BASE_URL}/users/requests/`, detail).then((res) => {
    dispatch({ type: types.CREATE_REQUEST });
    return res.data;
  });

export default getAllRequests;
