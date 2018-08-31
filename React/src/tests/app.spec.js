import React from 'react';
import { shallow } from 'enzyme';
import App from '../App';

describe('Application Render test', () => {
  it('Renders without crashing', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.length).toBe(1);
  });
});
