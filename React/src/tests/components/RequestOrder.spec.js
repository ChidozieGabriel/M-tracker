import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import { OrderButton, mapStateToProps } from '../../components/RequestOrder';

describe('Request table component rendering', () => {
  const sinonSpyResolve = sinon.spy(() => Promise.resolve());
  const state = {
    user: {
      auth: {
        admin: false,
      },
      token: 'token',
    },
  };

  const wrapper = shallow(<OrderButton link={sinonSpyResolve} admin title="view" />);

  it('Should call the filter method on change', () => {
    wrapper.find('select#filter').simulate('change', { target: { value: '1' } });
    expect(sinonSpyResolve.called).toBe(true);
  });
  it('Should call the filter method on change', () => {
    wrapper.find('select#filter').simulate('change', { target: { value: '2' } });
    expect(sinonSpyResolve.called).toBe(true);
  });
  it('Should call the filter method on change', () => {
    wrapper.find('select#filter').simulate('change', { target: { value: '3' } });
    expect(sinonSpyResolve.called).toBe(true);
  });
  it('Should call the filter method on change', () => {
    wrapper.find('select#filter').simulate('change', { target: { value: '4' } });
    expect(sinonSpyResolve.called).toBe(true);
  });

  it('Should call the filter method on change', () => {
    const wrapper1 = shallow(
      <OrderButton link={sinonSpyResolve} admin={false} title="view" />,
    );
    wrapper1.find('select#filter').simulate('change', { target: { value: '5' } });
    expect(sinonSpyResolve.called).toBe(true);
  });

  it('Maps state To Props', () => {
    const storeState = mapStateToProps(state);
    const { admin } = storeState;
    expect(admin).toBe(false);
  });
});
