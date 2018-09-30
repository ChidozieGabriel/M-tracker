import axios from 'axios';
import * as types from '../types';

const getRequest = payload => ({
  type: types.ALL_REQUESTS,
  payload,
});

const getAllRequests = () => dispatch =>
  axios
    .get('/api/v1/users/requests/')
    .then(res => dispatch(getRequest(res.data.result)));

export default getAllRequests;
