import React from 'react';
import { shallow } from 'enzyme';
import Table from '../../components/SingleRequestTableBody';

describe('Single request test', () => {
  const request = {
    date: '2018-10-04T09:37:07.205Z',
    dept: 'Accounts ',
    id: 10,
    request: 'orihewoiiohioheiht4345',
    requester_email: 'example@gmail.com',
    requester_name: 'Example',
    status: '1',
    user_id: 1,
  };
  const wrapper = shallow(<Table request={request} />);
  it('render the table properly', () => {
    expect(wrapper.length).toBe(1);
  });
});
