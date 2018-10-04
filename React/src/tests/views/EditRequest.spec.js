import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import { EditRequest } from '../../view/EditRequest';

describe('Login Page rendering', () => {
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

  const fn = sinon.spy(() => Promise.resolve(result));

  const wrapper = shallow(
    <EditRequest
      admin={false}
      getRequest={fn}
      editRequest={fn}
      match={match}
      history={history}
    />,
  );

  it('should render the edit request page properly', () => {
    expect(wrapper.length).toBe(1);
  });
  it('should handle the submit on edit request page properly', () => {
    wrapper.instance().handleSubmit();
    expect(history.push).toHaveProperty('callCount', 0);
  });
});
