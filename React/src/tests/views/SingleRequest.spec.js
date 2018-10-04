import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import { SingleView, mapStateToProps } from '../../view/SingleRequest';

describe('Single request Page rendering', () => {
  const history = {
    push: sinon.spy(),
    replace: sinon.spy(),
  };
  const match = {
    params: {
      requestID: 1,
    },
  };
  const result = [
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
  ];

  const state = {
    user: {
      auth: {
        admin: false,
      },
      token: '',
    },
  };

  const fn = sinon.spy(() => Promise.resolve(result));

  const wrapper = shallow(
    <SingleView
      admin={false}
      SingleAdminRequest={fn}
      SingleRequest={fn}
      match={match}
      history={history}
    />,
  );

  it('should render the single request page properly', () => {
    expect(wrapper.length).toBe(1);
  });
  it('should update the state', () => {
    wrapper.instance().reloadDetails();
    expect(wrapper.instance().state.request).toBe(result[0]);
  });

  it('should render page when admin is true', () => {
    const wrapper1 = shallow(
      <SingleView admin SingleAdminRequest={fn} match={match} history={history} />,
    );
    wrapper1.instance().componentDidMount();
    expect(wrapper1.instance().state.request).toEqual({});
    expect(wrapper.length).toBe(1);
  });

  it('Maps state To Props', () => {
    const storeState = mapStateToProps(state);
    const { admin } = storeState;
    expect(admin).toBe(false);
  });
});
