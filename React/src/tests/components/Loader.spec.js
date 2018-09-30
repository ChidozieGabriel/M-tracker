import React from 'react';
import { shallow } from 'enzyme';
import Loader from '../../components/Loader';

describe('Loader component rendering', () => {
  const wrapper = shallow(<Loader loading />);

  it('Should render the Loader', () => {
    expect(wrapper.hasClass('loader')).toEqual(true);
    expect(wrapper.find('img').length).toEqual(1);
  });
  it('Should not render the Loader', () => {
    wrapper.setProps({ loading: false });
    expect(wrapper.hasClass('loader')).toEqual(false);
    expect(wrapper.find('img').length).toEqual(0);
  });
});
