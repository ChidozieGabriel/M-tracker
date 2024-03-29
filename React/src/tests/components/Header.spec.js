import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import { Header, mapStateToProps } from '../../components/Header';

describe('Header component rendering', () => {
  const history = {
    push: sinon.spy(),
    replace: sinon.spy(),
  };

  const sinonSpyResolve = sinon.spy(() => Promise.resolve());
  const wrapper = shallow(
    <Header userLogOut={sinonSpyResolve} token="token" history={history} />,
  );
  const state = {
    user: {
      auth: {
        admin: false,
      },
      token: 'token',
    },
  };

  it('Should render the Header properly', () => {
    expect(wrapper.find('Link').hasClass('brand')).toEqual(true);
    expect(wrapper.find('Link').props().to).toEqual('/');
  });

  it('Should call the approve method on click', () => {
    wrapper.find('NavLink#logout').simulate('click', { preventDefault() {} });
    expect(sinonSpyResolve.called).toBe(true);
  });

  it('Maps state To Props', () => {
    const storeState = mapStateToProps(state);
    const { token } = storeState;
    expect(token).toBe('token');
  });
});
