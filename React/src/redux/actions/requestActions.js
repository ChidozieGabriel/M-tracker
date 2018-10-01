import axios from 'axios';
import * as types from '../types';

const getRequest = payload => ({
  type: types.ALL_REQUESTS,
  payload,
});

const getSingleRequest = payload => ({
  type: types.SINGLE_REQUESTS,
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

export default getAllRequests;
