import React from 'react';
import { shallow } from 'enzyme';
import Footer from '../../components/Footer';

describe('Footer component rendering', () => {
  it('Should render the Footer properly', () => {
    const wrapper = shallow(<Footer />);
    expect(wrapper.find('footer').length).toBe(1);
    expect(wrapper.find('footer').contains(<p>&copy;2018 VeeqTor</p>)).toEqual(true);
  });
});
