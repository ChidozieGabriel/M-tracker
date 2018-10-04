import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import { AdminButton } from '../../components/AdminButtons';

describe('Admin Button component test', () => {
  const request = {
    date: '2018-10-04T09:37:07.205Z',
    dept: 'Accounts ',
    id: 10,
    request: 'orihewoiiohioheiht4345',
    requester_email: 'example@gmail.com',
    requester_name: 'Example',
    status: '3',
    user_id: 1,
  };
  const sinonSpyResolve = sinon.spy(() => Promise.resolve());

  const wrapper = shallow(
    <AdminButton
      approve={sinonSpyResolve}
      disapprove={sinonSpyResolve}
      resolve={sinonSpyResolve}
      reload={sinonSpyResolve}
      request={request}
    />,
  );

  it('Should render the Request form', () => {
    expect(wrapper.length).toBe(1);
  });

  it('Should call the approve method on click', () => {
    wrapper.find('Button#Approve').simulate('click');
    expect(sinonSpyResolve.called).toBe(true);
  });
  it('Should call the disapprove method on click', () => {
    wrapper.find('Button#Disapprove').simulate('click');
    expect(sinonSpyResolve.called).toBe(true);
  });
  it('Should call the resolve method on click', () => {
    wrapper.find('Button#Resolve').simulate('click');
    expect(sinonSpyResolve.called).toBe(true);
  });
});
