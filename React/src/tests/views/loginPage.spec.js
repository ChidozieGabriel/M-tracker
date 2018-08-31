import React from 'react';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import ConnectedLoginPage, { LoginPage } from '../../view/LoginPage';

describe('Login Page rendering', () => {
  const middleware = [thunk]; // add your middleware like `redux-thunk`
  const mockStore = configureMockStore(middleware);

  const initialState = {
    user: {
      token: '',
    },
  };
  const store = mockStore(initialState);
  const state = store.getState();

  const data = {
    email: '',
    password: '',
  };

  const fn = jest.fn(() => Promise.resolve());
  const wrapper = shallow(<LoginPage token="" store={store} userLogin={fn} />);

  it('should render the login page properly', () => {
    wrapper.setProps({ token: '' });
    expect(wrapper.length).toBe(1);
    expect(wrapper.find('Redirect').length).toBe(0);
  });

  it('should render the redirect on login', () => {
    wrapper.setProps({ token: 'bar' });
    expect(wrapper.find('Redirect').length).toBe(1);
  });

  it('should render login page correctly and redirect on login', () => {
    wrapper.instance().submit(data);
    expect(wrapper.find('Redirect').length).toBe(1);
  });
  it('should render login page correctly and redirect on login', () => {
    const wrapperConnected = shallow(
      <ConnectedLoginPage store={store} userLogin={fn} />,
    );
    const actual = wrapperConnected.instance().selector.props.token;
    expect(actual).toBe('');
  });
});
