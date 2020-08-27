import React from 'react';

import Home from './home.container';
import { shallow } from 'enzyme';

test('renders learn react link', () => {
  const wrapper = shallow(<Home />);

  expect(wrapper.find('a').text()).toEqual('Learn React');
  expect(wrapper).toBeTruthy();
});
