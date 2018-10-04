import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import { Dashboard, mapStateToProps } from '../../view/Dashboard';

describe('Dashboard Page rendering', () => {
  const history = {
    push: sinon.spy(),
    replace: sinon.spy(),
  };
  const match = {
    params: {
      requestID: 1,
    },
  };
  const result = {
    payload: [
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
    ],
  };

  const error = {
    response: {
      data: {
        errors: {
          message: 'Not working',
        },
      },
    },
  };

  const state = {
    user: {
      auth: {
        admin: false,
      },
      token: '',
    },
  };

  const fn = sinon.spy(() => Promise.resolve(result));
  const fnFail = sinon.spy(() => Promise.reject(error));

  const wrapper = shallow(
    <Dashboard
      admin={false}
      getAllRequest={fn}
      deleteRequest={fn}
      adminRequests={fn}
      orderBy={fn}
      match={match}
      history={history}
    />,
  );

  it('should render the dashboard page properly', () => {
    wrapper.instance().handleDelete();
    wrapper.instance().requestLink();
    expect(wrapper.length).toBe(1);
  });

  it('should render the dashboard page properly', () => {
    const wrapper1 = shallow(
      <Dashboard
        admin
        getAllRequest={fn}
        deleteRequest={fnFail}
        adminRequests={fn}
        orderBy={fn}
        match={match}
        history={history}
      />,
    );
    expect(wrapper1.length).toBe(1);
  });

  it('Maps state To Props', () => {
    const storeState = mapStateToProps(state);
    const { admin } = storeState;
    expect(admin).toBe(false);
  });
});
