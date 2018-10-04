import React from 'react';
import { shallow } from 'enzyme';
import Button from '../../components/Button';

describe('Button component', () => {
  it('should render the button properly', () => {
    const wrapper = shallow(
      <Button
        to="/dashboard"
        className="btn btn-primary"
        text="Back"
        iconName="fa-arrow-left"
        title="Click to go back"
      />,
    );
    expect(wrapper.length).toBe(1);
  });
});
