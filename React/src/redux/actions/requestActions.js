import axios from 'axios';
import * as types from '../types';

const BASE_URL = window.location.origin;

const getRequest = payload => ({
  type: types.ALL_REQUESTS,
  payload,
});

const getSingleRequest = payload => ({
  type: types.SINGLE_REQUEST,
  payload,
});
const getAllRequests = () => dispatch =>
  axios
    .get(`${BASE_URL}/api/v1/users/requests/`)
    .then(res => dispatch(getRequest(res.data.result)));

export const getAllAdminRequests = () => dispatch =>
  axios
    .get(`${BASE_URL}/api/v1/requests/`)
    .then(res => dispatch(getRequest(res.data.result)));

export const getAllRequestsByOrder = url => dispatch =>
  axios
    .get(`${BASE_URL}/api/v1${url}`)
    .then(res => dispatch(getRequest(res.data.result)));

export const getAdminRequest = id => dispatch =>
  axios.get(`${BASE_URL}/api/v1/requests/admin/${id}`).then((res) => {
    dispatch(getSingleRequest(res.data.result));
    return res.data.result;
  });

export const approveRequest = id => dispatch =>
  axios.put(`${BASE_URL}/api/v1/requests/${id}/approve`).then((res) => {
    dispatch(getSingleRequest(res.data.result));
    return res.data.result;
  });
export const disapproveRequest = id => dispatch =>
  axios.put(`${BASE_URL}/api/v1/requests/${id}/disapprove`).then((res) => {
    dispatch(getSingleRequest(res.data.result));
    return res.data.result;
  });
export const resolveRequest = id => dispatch =>
  axios.put(`${BASE_URL}/api/v1/requests/${id}/resolve`).then((res) => {
    dispatch(getSingleRequest(res.data.result));
    return res.data.result;
  });
export const getASingleRequest = id => dispatch =>
  axios.get(`${BASE_URL}/api/v1/users/requests/${id}`).then((res) => {
    dispatch(getSingleRequest(res.data.result));
    return res.data.result;
  });

export const createRequestAction = detail => dispatch =>
  axios.post(`${BASE_URL}/api/v1/users/requests/`, detail).then((res) => {
    dispatch({ type: types.CREATE_REQUEST });
    return res.data;
  });

export const editRequestAction = (detail, id) => dispatch =>
  axios.put(`${BASE_URL}/api/v1/users/requests/${id}`, detail).then((res) => {
    dispatch({ type: types.EDIT_REQUEST });
    return res.data;
  });

export const deleteRequestAction = id => dispatch =>
  axios.delete(`${BASE_URL}/api/v1/users/requests/${id}/delete`).then((res) => {
    dispatch({ type: types.DELETE_REQUEST });
    return res.data;
  });

export default getAllRequests;
