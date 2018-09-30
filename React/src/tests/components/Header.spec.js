import React from 'react';
import { shallow } from 'enzyme';

import Header from '../../components/Header';

describe('Header component rendering', () => {
  const wrapper = shallow(<Header />);

  it('Should render the Header properly', () => {
    expect(wrapper.find('Link').hasClass('brand')).toEqual(true);
    expect(wrapper.find('Link').props().to).toEqual('/');
  });
});
