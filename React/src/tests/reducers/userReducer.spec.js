import userReducer from '../../redux/reducers/userReducer';
import * as types from '../../redux/types';

describe('Test userReducers', () => {
  const state = {
    auth: false,
    token: 'kam',
  };

  it('Should return initial state', () => {
    expect(userReducer({}, {})).toEqual({});
  });

  it('Should return state of loaded user', () => {
    const actual = userReducer(state, {
      type: types.SAVE_USER_TOKEN,
      payload: state,
    });
    const expected = {
      auth: false,
      token: 'kam',
    };
    expect(actual).toEqual(expected);
  });

  it('Should return state of loaded user', () => {
    const actual = userReducer(state, {
      type: types.LOG_OUT,
    });
    const expected = { auth: null, token: null };
    expect(actual).toEqual(expected);
  });
});
