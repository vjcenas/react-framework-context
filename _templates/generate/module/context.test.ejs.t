---
to: src/contexts/__tests__/<%= h.changeCase.paramCase(name) %>.context.test.tsx
---

import React, { useEffect } from 'react';
import axios from 'axios';
import { mount, ReactWrapper } from 'enzyme';
import { act } from 'react-dom/test-utils';
import { <%= h.changeCase.camel(name) %>Mock } from 'src/models/mocks/<%= h.changeCase.paramCase(name) %>.mock';
import { <%= h.changeCase.pascal(name) %>Provider, use<%= h.changeCase.pascal(name) %>Context } from '../<%= h.changeCase.paramCase(name) %>.context';

const mockAxios = axios.create();
let wrapper: ReactWrapper;

const StateComponent = () => {
  const { state } = use<%= h.changeCase.pascal(name) %>Context();

  return <div>{state.data?.name}</div>;
};

const ActionComponent = () => {
  const { state, actions } = use<%= h.changeCase.pascal(name) %>Context();

  useEffect(() => {
    actions.dataGET(1);
  }, [actions]);

  return <div>{state.data?.name}</div>;
};

describe('<%= h.changeCase.pascal(name) %>Context', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should render children', () => {
    const content = 'test';

    wrapper = mount(
      <<%= h.changeCase.pascal(name) %>Provider>
        <div>{content}</div>
      </<%= h.changeCase.pascal(name) %>Provider>
    );

    expect(wrapper.find('div')).toHaveLength(1);
    expect(wrapper.text()).toEqual(content);
  });

  it('should render state value', () => {
    const data = <%= h.changeCase.camel(name) %>Mock();

    wrapper = mount(
      <<%= h.changeCase.pascal(name) %>Provider
        state={{
          data,
        }}
      >
        <StateComponent />
      </<%= h.changeCase.pascal(name) %>Provider>
    );

    expect(wrapper.text()).toEqual(data.name);
  });

  it('should call action and update DOM', async () => {
    const <%= h.changeCase.camel(name) %> = <%= h.changeCase.camel(name) %>Mock();

    jest.spyOn(mockAxios, 'get').mockImplementationOnce(() =>
      Promise.resolve({
        data: {
          <%= h.changeCase.camel(name) %>,
        },
      })
    );

    await act(async () => {
      wrapper = mount(
        <<%= h.changeCase.pascal(name) %>Provider>
          <ActionComponent />
        </<%= h.changeCase.pascal(name) %>Provider>
      );

      await wrapper.update();
    });

    expect(wrapper.text()).toEqual(<%= h.changeCase.camel(name) %>.name);
  });
});
