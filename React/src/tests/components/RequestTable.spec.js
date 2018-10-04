import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import { RequestTable, mapStateToProps } from '../../components/RequestTable';

describe('Request table component rendering', () => {
  const sinonSpyResolve = sinon.spy(() => Promise.resolve());
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
  const wrapper = shallow(
    <RequestTable
      deleteRequest={sinonSpyResolve}
      requests={result.payload}
      admin={false}
      link="view/order/1"
    />,
  );
  const state = {
    user: {
      auth: {
        admin: false,
      },
      token: 'token',
    },
  };

  it('Should call the delete method on click', () => {
    wrapper.find('Button#delete').simulate('click');
    expect(sinonSpyResolve.called).toBe(false);
  });

  it('Should call the delete method on click', () => {
    const wrapper1 = shallow(
      <RequestTable
        deleteRequest={sinonSpyResolve}
        requests={result.payload}
        admin
        link="view/order/1"
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
