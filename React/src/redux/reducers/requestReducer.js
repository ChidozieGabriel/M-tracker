import * as types from '../types';

export default (state = {}, action) => {
  switch (action.type) {
  case types.ALL_REQUESTS:
    return {
      ...state,
      requests: action.payload,
    };

  default:
    return state;
  }
};
