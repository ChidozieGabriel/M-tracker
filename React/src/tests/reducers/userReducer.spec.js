import userReducer from '../../redux/reducers/userReducer';
import * as types from '../../redux/types';

describe('Test userReducers', () => {
  const state = {
    token: 'kam',
  };

  it('Should return initial state', () => {
    expect(userReducer({}, {})).toEqual({});
  });

  it('Should return state of loaded user', () => {
    const actual = userReducer(state, {
      type: types.GET_USER_TOKEN,
      payload: state.token,
    });
    const expected = { token: 'kam' };
    expect(actual).toEqual(expected);
  });
});
