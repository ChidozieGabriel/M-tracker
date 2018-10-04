import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import * as types from '../../redux/types';
import getAllRequests, {
  getAdminRequest,
  getAllAdminRequests,
  getAllRequestsByOrder,
  approveRequest,
  disapproveRequest,
  resolveRequest,
  getASingleRequest,
  createRequestAction,
  editRequestAction,
  deleteRequestAction,
} from '../../redux/actions/requestActions';

describe('Login Action', () => {
  const middleware = [thunk]; // add your middleware like `redux-thunk`
  const mockStore = configureMockStore(middleware);
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  const resultResponse = [
    {
      date: '2018-10-04T09:37:07.205Z',
      dept: 'Accounts ',
      id: 10,
      request: 'orihewoiiohioheiht4345',
      requester_email: 'example@gmail.com',
      requester_name: 'Example',
      status: '1',
      user_id: 1,
    },
    {
      date: '2018-10-04T09:37:07.205Z',
      dept: 'Accounts ',
      id: 11,
      request: 'orihewoiiohioheiht4345',
      requester_email: 'example@gmail.com',
      requester_name: 'Example',
      status: '0',
      user_id: 1,
    },
  ];

  it('should get all requests', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: resultResponse,
      });
    });

    const store = mockStore({});

    return store.dispatch(getAllRequests()).then(() => {
      expect(store.getActions()[0]).toEqual({
        type: types.ALL_REQUESTS,
      });
    });
  });

  it('should get all requests', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: resultResponse,
      });
    });

    const store = mockStore({});

    return store.dispatch(getAllAdminRequests()).then(() => {
      expect(store.getActions()[0]).toEqual({
        type: types.ALL_REQUESTS,
      });
    });
  });

  it('should get all requests by order', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: resultResponse,
      });
    });

    const store = mockStore({});

    return store.dispatch(getAllRequestsByOrder('approved')).then(() => {
      expect(store.getActions()[0]).toEqual({
        type: types.ALL_REQUESTS,
      });
    });
  });

  it('should get a requests for admins', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: resultResponse[0],
      });
    });

    const store = mockStore({});

    return store.dispatch(getAdminRequest()).then(() => {
      expect(store.getActions()[0]).toEqual({
        type: types.SINGLE_REQUEST,
      });
    });
  });

  it('should get a requests for approved requests', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: resultResponse[0],
      });
    });

    const store = mockStore({});

    return store.dispatch(approveRequest()).then(() => {
      expect(store.getActions()[0]).toEqual({
        type: types.SINGLE_REQUEST,
      });
    });
  });

  it('should get a requests for disapproved requests', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: resultResponse[0],
      });
    });

    const store = mockStore({});

    return store.dispatch(disapproveRequest()).then(() => {
      expect(store.getActions()[0]).toEqual({
        type: types.SINGLE_REQUEST,
      });
    });
  });

  it('should get a requests for resolved requests', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: resultResponse[0],
      });
    });

    const store = mockStore({});

    return store.dispatch(resolveRequest()).then(() => {
      expect(store.getActions()[0]).toEqual({
        type: types.SINGLE_REQUEST,
      });
    });
  });

  it('should get a requests for resolved requests', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: resultResponse[0],
      });
    });

    const store = mockStore({});

    return store.dispatch(getASingleRequest()).then(() => {
      expect(store.getActions()[0]).toEqual({
        type: types.SINGLE_REQUEST,
      });
    });
  });

  it('should create a new request', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 201,
        response: {
          message: 'Successful',
        },
      });
    });

    const details = {
      dept: 'vicotr',
      request: 'example@gmail.com',
    };

    const store = mockStore({});

    return store.dispatch(createRequestAction(details)).then(() => {
      expect(store.getActions()[0]).toEqual({
        type: types.CREATE_REQUEST,
      });
    });
  });
  it('should edit a request', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 201,
        response: {
          message: 'Successful',
        },
      });
    });

    const store = mockStore({});

    return store.dispatch(editRequestAction()).then(() => {
      expect(store.getActions()[0]).toEqual({
        type: types.EDIT_REQUEST,
      });
    });
  });

  it('should delete a request', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 201,
        response: {
          message: 'Successful',
        },
      });
    });

    const store = mockStore({});

    return store.dispatch(deleteRequestAction()).then(() => {
      expect(store.getActions()[0]).toEqual({
        type: types.DELETE_REQUEST,
      });
    });
  });
});
