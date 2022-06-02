---
to: src/ducks/__tests__/<%= h.changeCase.paramCase(name) %>.duck.test.ts
---

import { <%= h.changeCase.camel(name) %>Mock } from 'src/models/mocks/<%= h.changeCase.paramCase(name) %>.mock';
import <%= h.changeCase.pascal(name) %>Reducer, { defaultState, <%= h.changeCase.camel(name) %>ActionTypes } from '../<%= h.changeCase.paramCase(name) %>.duck';

const <%= h.changeCase.camel(name) %> = <%= h.changeCase.camel(name) %>Mock();
const list = Array(10).fill(null).map(<%= h.changeCase.camel(name) %>Mock);

describe('<%= h.changeCase.pascal(name) %> Duck', () => {
  it(`should process ${<%= h.changeCase.camel(name) %>ActionTypes.<%= h.changeCase.constant(name) %>_DATA_READ} action type`, () => {
    const state = <%= h.changeCase.pascal(name) %>Reducer(defaultState, {
      type: <%= h.changeCase.camel(name) %>ActionTypes.<%= h.changeCase.constant(name) %>_DATA_READ,
      payload: {
        <%= h.changeCase.camel(name) %>,
      },
    });

    expect(state.data).toEqual(<%= h.changeCase.camel(name) %>);
  });

  it(`should process ${<%= h.changeCase.camel(name) %>ActionTypes.<%= h.changeCase.constant(name) %>_LIST_READ} action type`, () => {
    const state = <%= h.changeCase.pascal(name) %>Reducer(defaultState, {
      type: <%= h.changeCase.camel(name) %>ActionTypes.<%= h.changeCase.constant(name) %>_LIST_READ,
      payload: {
        count: list.length,
        rows: list,
      },
    });

    expect(state.list).toEqual(list);
    expect(state.total).toEqual(list.length);
  });

  it(`should process ${<%= h.changeCase.camel(name) %>ActionTypes.<%= h.changeCase.constant(name) %>_DATA_CREATE} action type`, () => {
    const state = <%= h.changeCase.pascal(name) %>Reducer(defaultState, {
      type: <%= h.changeCase.camel(name) %>ActionTypes.<%= h.changeCase.constant(name) %>_DATA_CREATE,
      payload: {
        <%= h.changeCase.camel(name) %>,
      },
    });

    expect(state.data).toEqual(<%= h.changeCase.camel(name) %>);
  });

  it(`should process ${<%= h.changeCase.camel(name) %>ActionTypes.<%= h.changeCase.constant(name) %>_DATA_UPDATE} action type`, () => {
    const name = 'New Name';

    const state = <%= h.changeCase.pascal(name) %>Reducer(
      {
        ...defaultState,
        data: <%= h.changeCase.camel(name) %>,
      },
      {
        type: <%= h.changeCase.camel(name) %>ActionTypes.<%= h.changeCase.constant(name) %>_DATA_UPDATE,
        payload: {
          <%= h.changeCase.camel(name) %>: {
            ...<%= h.changeCase.camel(name) %>,
            name,
          },
        },
      }
    );

    expect(state.data?.name).toEqual(name);
  });

  it(`should process ${<%= h.changeCase.camel(name) %>ActionTypes.<%= h.changeCase.constant(name) %>_DATA_DELETE} action type`, () => {
    const state = <%= h.changeCase.pascal(name) %>Reducer(
      {
        ...defaultState,
        data: list[0],
        list,
        total: list.length,
      },
      {
        type: <%= h.changeCase.camel(name) %>ActionTypes.<%= h.changeCase.constant(name) %>_DATA_DELETE,
        params: [list[0].id],
        payload: {
          success: true,
        },
      }
    );

    const count = list.length - 1;
    expect(state.data).toEqual(undefined);
    expect(state.list).toHaveLength(count);
    expect(state.total).toEqual(count);
  });

  it(`should not process ${<%= h.changeCase.camel(name) %>ActionTypes.<%= h.changeCase.constant(name) %>_DATA_DELETE} action type because no parameters found`, () => {
    const state = <%= h.changeCase.pascal(name) %>Reducer(
      {
        ...defaultState,
        data: list[0],
        list,
        total: list.length,
      },
      {
        type: <%= h.changeCase.camel(name) %>ActionTypes.<%= h.changeCase.constant(name) %>_DATA_DELETE,
        payload: {
          success: true,
        },
      }
    );

    expect(state.data).toEqual(list[0]);
    expect(state.list).toEqual(list);
    expect(state.total).toEqual(list.length);
  });

  it(`should process ${<%= h.changeCase.camel(name) %>ActionTypes.<%= h.changeCase.constant(name) %>_DATA_SET} action type`, () => {
    const state = <%= h.changeCase.pascal(name) %>Reducer(
      { ...defaultState, data: list[0] },
      {
        type: <%= h.changeCase.camel(name) %>ActionTypes.<%= h.changeCase.constant(name) %>_DATA_SET,
        payload: {
          <%= h.changeCase.camel(name) %>: list[1],
        },
      }
    );

    expect(state.data).toEqual(list[1]);
  });

  it('should not process any action type', () => {
    const state = <%= h.changeCase.pascal(name) %>Reducer(defaultState, {
      type: 'RANDOM_TYPE' as any,
      payload: {
        success: true,
      },
    });

    expect(state).toEqual(defaultState);
  });
});
