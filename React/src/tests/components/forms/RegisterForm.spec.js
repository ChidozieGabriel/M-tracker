import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import RegisterForm from '../../../components/forms/RegisterForm';

describe('Register form component test', () => {
  const error = {
    response: {
      data: {
        errors: 'Catch errors',
      },
    },
  };
  const sinonSpy = sinon.spy(() => Promise.reject(error));
  const wrapper = shallow(<RegisterForm submit={sinonSpy} />);

  it('Should render the Login form', () => {
    // console.log(wrapper.debug());
    expect(wrapper.find('form').length).toBe(1);
  });

  it('Should handle and store the email input', () => {
    wrapper.find('#email').simulate('change', {
      target: { name: 'email', value: 'nwokeochavictor@gmail.com' },
    });
    const actual = wrapper.state().user.email;
    const expected = 'nwokeochavictor@gmail.com';
    expect(actual).toEqual(expected);
  });

  it('Should handle and store the password input', () => {
    wrapper.find('#password').simulate('change', {
      target: { name: 'password', value: '123456' },
    });
    const actual = wrapper.state().user.password;
    const expected = '123456';
    expect(actual).toEqual(expected);
  });

  it('Should handle login input errors', () => {
    wrapper.setState({
      errors: { email: ['Not available'], password: ['Not available'] },
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

  it('Should call the submit method on submit', () => {
    wrapper.find('form').simulate('submit', { preventDefault() {} });
    expect(sinonSpy.called).toBe(true);
  });
});
