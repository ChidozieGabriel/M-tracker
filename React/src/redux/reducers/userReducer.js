import * as types from '../types';

const initialState = {
  token: '',
};
export default (state = initialState, action) => {
  switch (action.type) {
  case types.SAVE_USER_TOKEN:
    return {
      ...state,
      token: action.payload,
    };
  case types.LOG_OUT:
    return {
      ...state,
      token: null,
    };
  default:
    return state;
  }
};
