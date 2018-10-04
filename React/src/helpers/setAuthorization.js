import axios from 'axios';

const setAuth = (token = null) => {
  if (token) {
    axios.defaults.headers.common.authorization = `Bearer ${token}`;
  } else {
    return delete axios.defaults.headers.common.authorization;
  }
};
export default setAuth;
