import React from 'react';
import { shallow } from 'enzyme';
import Button from './button.container';

describe('Button Container', () => {
  it('shound render', () => {
    const wrapper = shallow(<Button>Test</Button>);

    expect(wrapper.text()).toEqual('Test');
  });
});
