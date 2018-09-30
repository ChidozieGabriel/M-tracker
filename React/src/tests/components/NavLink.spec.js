import React from 'react';
import { shallow } from 'enzyme';
import NavLink from '../../components/NavLink';

describe('Loader component rendering', () => {
  const wrapper = shallow(
    <NavLink title="login" onclick={jest.fn()} to="/" icon="icon" />,
  );

  it('Should render the Loader', () => {
    expect(wrapper.length).toEqual(1);
    expect(wrapper.hasClass('btn')).toEqual(true);
    expect(wrapper.find('Link').length).toEqual(1);
    expect(wrapper.find('Link').props().to).toEqual('/');
    expect(wrapper.find('i').hasClass('icon')).toEqual(true);
  });
});
