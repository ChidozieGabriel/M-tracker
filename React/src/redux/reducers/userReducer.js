import * as types from '../types';

const initialState = {
  token: '',
  auth: '',
};
export default (state = initialState, action) => {
  switch (action.type) {
  case types.SAVE_USER_TOKEN:
    return {
      ...state,
      token: action.payload.token,
      auth: action.payload.auth,
    };
  case types.LOG_OUT:
    return {
      ...state,
      token: null,
      auth: null,
    };
  default:
    return state;
  }
};
