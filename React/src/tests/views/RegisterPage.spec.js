import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import { Register, mapStateToProps } from '../../view/RegisterPage';

describe('Login Page rendering', () => {
  const history = {
    push: sinon.spy(),
    replace: sinon.spy(),
  };

  const state = {
    user: {
      token: '',
    },
  };
  const fn = sinon.spy(() => Promise.resolve());

  it('should render the login page properly', () => {
    const wrapper = shallow(
      <Register token="" registerUser={fn} history={history} />,
    );
    expect(wrapper.length).toBe(1);
  });

  it('should redirect to dashboard if already logged in', () => {
    shallow(<Register token="1234566" registerUser={fn} history={history} />);
    expect(history.replace).toHaveProperty('callCount', 0);
  });

  it('should submit a the form', () => {
    const wrapper = shallow(
      <Register token="1234566" registerUser={fn} history={history} />,
    );
    wrapper.instance().register();
    expect(history.push).toHaveProperty('callCount', 2);
  });

  // it('Maps Dispatch To Props', () => {
  //   const dispatchSpy = sinon.spy();
  //   const { loadData, getArticleComments } = mapDispatchToProps(dispatchSpy);
  //   loadData();
  //   getArticleComments(article.slug);
  //   expect(dispatchSpy.callCount).toBe(2);
  // });

  it('Maps state To Props', () => {
    const storeState = mapStateToProps(state);
    const { token } = storeState;
    expect(token).toBe('');
  });
});
