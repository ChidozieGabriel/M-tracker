import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import * as types from '../../redux/types';
import login from '../../redux/actions/userActions';

describe('Login Action', () => {
  const middleware = [thunk]; // add your middleware like `redux-thunk`
  const mockStore = configureMockStore(middleware);
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });
  it('should login with login details', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          auth: {
            id: 1,
            admin: true,
            iat: 1535384103,
            exp: 1535387703,
          },
          token: 'n9VuWqJtOmWT48fxg6q8',
        },
      });
    });

    const details = {
      email: 'example@gmail.com',
      password: '123456',
    };

    const store = mockStore({});

    return store.dispatch(login(details)).then(() => {
      expect(store.getActions()[0]).toEqual({
        type: types.GET_USER_TOKEN,
        payload: 'n9VuWqJtOmWT48fxg6q8',
      });
    });
  });
});
