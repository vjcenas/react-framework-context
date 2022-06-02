---
to: src/selectors/__tests__/<%= h.changeCase.paramCase(name) %>.selector.test.ts
---

import { <%= h.changeCase.camel(name) %>ActionTypes } from 'src/ducks/<%= h.changeCase.paramCase(name) %>.duck';
import { <%= h.changeCase.camel(name) %>Mock } from 'src/models/mocks/<%= h.changeCase.paramCase(name) %>.mock';
import { get<%= h.changeCase.pascal(name) %>Status } from '../<%= h.changeCase.paramCase(name) %>.selector';

describe('<%= h.changeCase.pascal(name) %> Selector', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should get status', () => {
    const data = <%= h.changeCase.camel(name) %>Mock();

    const result = get<%= h.changeCase.pascal(name) %>Status(
      {
        data,
        status: {
          [<%= h.changeCase.camel(name) %>ActionTypes.<%= h.changeCase.constant(name) %>_DATA_READ]: {
            fetching: false,
            error: null
          },
        },
        list: [],
        total: 0,
      },
      <%= h.changeCase.camel(name) %>ActionTypes.<%= h.changeCase.constant(name) %>_DATA_READ
    );

    expect(result).toEqual({
      fetching: false,
      error: null,
    });
  });
});
