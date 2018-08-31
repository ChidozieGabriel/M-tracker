import React from 'react';
import { shallow } from 'enzyme';
import HomePage from '../../view/HomePage';

describe('Homepage component rendering', () => {
  it('Should render the homepage properly', () => {
    const wrapper = shallow(<HomePage />);
    expect(wrapper.length).toBe(1);
  });
});
