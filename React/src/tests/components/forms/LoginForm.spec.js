import React from 'react';
import { shallow } from 'enzyme';

import LoginForm from '../../../components/forms/LoginForm';

describe('Login form component test', () => {

  const wrapper = shallow(<LoginForm submit={jest.fn()} />);

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

  // it('Should handle submit', () => {
  //   const data = {
  //     errors: {
  //       email: ['Not available'],
  //       password: ['Not available'],
  //     },
  //   };
  //   const response = { data };
  //   const err = { response };
  //   const fn = jest.fn(() => Promise.reject(err));
  //   fn().catch((err) => {
  //     console.log(err);
  //   });
  //   wrapper.setProps({ submit: fn });
  //   // const submitfn = jest.fn();

  //   const actual = wrapper
  //     .find('form')
  //     .simulate('submit', { preventDefault() {} });
  //   console.log(actual);
  //   expect(actual).toHaveBeenCalledWith();
  //   const submit = wrapper.instance().handleSubmit;
  //   // expect.assertions(1);
  //   const actual = wrapper
  //     .find('form')
  //     .simulate('submit', { preventDefault() {} });
  //   return expect(actual).rejects.toMatch('error');
  // });

  // wrapper.simulate('click');
});
