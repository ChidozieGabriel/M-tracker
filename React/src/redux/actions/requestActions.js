import axios from 'axios';
import decoded from 'jwt-decode';
import * as types from '../types';

const getRequest = payload => ({
  type: types.ALL_REQUESTS,
  payload,
});

const getSingleRequest = payload => ({
  type: types.SINGLE_REQUEST,
  payload,
});

export const checkAdmin = () => {
  const { admin } = decoded(localStorage.mTracker);
  return admin;
};
const getAllRequests = () => dispatch =>
  axios
    .get(`${process.env.BASE_URL}/users/requests/`)
    .then(res => dispatch(getRequest(res.data.result)));

export const getAllAdminRequests = () => dispatch =>
  axios
    .get(`${process.env.BASE_URL}/requests/`)
    .then(res => dispatch(getRequest(res.data.result)));

export const getAdminRequest = id => dispatch =>
  axios.get(`${process.env.BASE_URL}/requests/admin/${id}`).then((res) => {
    dispatch(getSingleRequest(res.data.result));
    return res.data.result;
  });

export const approveRequest = id => dispatch =>
  axios.put(`${process.env.BASE_URL}/requests/${id}/approve`).then((res) => {
    dispatch(getSingleRequest(res.data.result));
    return res.data.result;
  });
export const disapproveRequest = id => dispatch =>
  axios.put(`${process.env.BASE_URL}/requests/${id}/disapprove`).then((res) => {
    dispatch(getSingleRequest(res.data.result));
    return res.data.result;
  });
export const resolveRequest = id => dispatch =>
  axios.put(`${process.env.BASE_URL}/requests/${id}/resolve`).then((res) => {
    dispatch(getSingleRequest(res.data.result));
    return res.data.result;
  });
export const getASingleRequest = id => dispatch =>
  axios.get(`${process.env.BASE_URL}/users/requests/${id}`).then((res) => {
    dispatch(getSingleRequest(res.data.result));
    return res.data.result;
  });

export const createRequestAction = detail => dispatch =>
  axios.post(`${process.env.BASE_URL}/users/requests/`, detail).then((res) => {
    dispatch({ type: types.CREATE_REQUEST });
    return res.data;
  });

export const editRequestAction = (detail, id) => dispatch =>
  axios.put(`${process.env.BASE_URL}/users/requests/${id}`, detail).then((res) => {
    dispatch({ type: types.EDIT_REQUEST });
    return res.data;
  });

export const deleteRequestAction = id => dispatch =>
  axios.delete(`${process.env.BASE_URL}/users/requests/${id}/delete`).then((res) => {
    dispatch({ type: types.DELETE_REQUEST });
    return res.data;
  });

export default getAllRequests;
