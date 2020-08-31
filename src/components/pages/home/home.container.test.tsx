import React from 'react';

import { shallow } from 'enzyme';
import Home from './home.container';

describe(__filename, () => {
  it('should renders learn react link', () => {
    const wrapper = shallow(<Home />);

    expect(wrapper.find('a').text()).toEqual('Learn React');
    expect(wrapper).toBeTruthy();
  });
});
