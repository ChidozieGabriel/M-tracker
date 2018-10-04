import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import * as types from '../../redux/types';
import { login, register, logOut } from '../../redux/actions/userActions';

describe('Login Action', () => {
  const middleware = [thunk]; // add your middleware like `redux-thunk`
  const mockStore = configureMockStore(middleware);
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  const response = {
    auth: {
      id: 1,
      admin: true,
      iat: 1535384103,
      exp: 1535387703,
    },
    token: 'n9VuWqJtOmWT48fxg6q8',
  };
  it('should login with login details', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response,
      });
    });

    const details = {
      email: 'example@gmail.com',
      password: '123456',
    };

    const store = mockStore({});

    return store.dispatch(login(details)).then(() => {
      expect(store.getActions()[0]).toEqual({
        type: types.SAVE_USER_TOKEN,
        payload: response,
      });
    });
  });

  it('should register with register details', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response,
      });
    });

    const details = {
      name: 'vicotr',
      email: 'example@gmail.com',
      password: '123456',
    };

    const store = mockStore({});

    return store.dispatch(register(details)).then(() => {
      expect(store.getActions()[0]).toEqual({
        type: types.SAVE_USER_TOKEN,
        payload: response,
      });
    });
  });

  it('should logout a user', () => {
    const store = mockStore({});
    store.dispatch(logOut());
    expect(store.getActions()[0]).toEqual({ type: types.LOG_OUT });
  });
});
