import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import { RequestForm } from '../../../components/forms/RequestForm';

describe('Request form component test', () => {
  const error = {
    response: {
      data: {
        errors: 'Catch errors',
      },
    },
  };

  const params = {
    requestID: 1,
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
  const sinonSpy = sinon.spy(() => Promise.reject(error));
  const sinonSpyResolve = sinon.spy(() => Promise.resolve(result));
  const wrapper = shallow(
    <RequestForm
      submit={sinonSpyResolve}
      getRequest={sinonSpyResolve}
      params={params}
    />,
  );

  it('Should render the Request form', () => {
    expect(wrapper.length).toBe(1);
  });

  it('Should call the submit method on submit', () => {
    wrapper.find('form').simulate('submit', { preventDefault() {} });
    expect(sinonSpyResolve.called).toBe(true);
  });

  it('Should catch errors on form submit', () => {
    const wrapper1 = shallow(
      <RequestForm submit={sinonSpy} getRequest={sinonSpyResolve} />,
    );
    wrapper1.find('form').simulate('submit', { preventDefault() {} });
    expect(sinonSpyResolve.called).toBe(true);
  });

  it('Should handle and store the department input', () => {
    wrapper.find('#dept').simulate('change', {
      target: { name: 'dept', value: 'nwokeocha' },
    });
    const actual = wrapper.state().data.dept;
    const expected = 'nwokeocha';
    expect(actual).toEqual(expected);
  });

  it('Should handle and store the request input', () => {
    wrapper.find('#request').simulate('change', {
      target: {
        name: 'request',
        value: 'nwokeocha needs a repair as quick as possible',
      },
    });
    const actual = wrapper.state().data.request;
    const expected = 'nwokeocha needs a repair as quick as possible';
    expect(actual).toEqual(expected);
  });

  it('Should handle request input errors', () => {
    wrapper.setState({
      errors: { dept: ['Not available'], request: ['Not available'] },
    });
    const actual1 = wrapper.find('#error-email').text();
    const actual2 = wrapper.find('#error-password').text();
    const expected = 'Not available';
    expect(actual1).toEqual(expected);
    expect(actual2).toEqual(expected);
  });

  it('Should handle login errors', () => {
    wrapper.setState({ errors: { message: ['Auth failed'] } });
    const actual = wrapper.find('#alert-box').text();
    const expected = 'Auth failed';
    expect(actual).toEqual(expected);
  });
});
