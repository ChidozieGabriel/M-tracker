import React from 'react';
import { shallow } from 'enzyme';
import AuthHeader from '../../components/AuthHeader';

describe('Admin form component test', () => {
  const wrapper = shallow(<AuthHeader />);

  it('Should render the Component', () => {
    expect(wrapper.length).toBe(1);
  });
});
