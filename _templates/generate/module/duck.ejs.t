---
to: src/ducks/<%= h.changeCase.paramCase(name) %>.duck.ts
---

import { ICommonState, IReducerAction } from 'src/libraries/thunk.library';
import services from 'src/services/<%= h.changeCase.paramCase(name) %>.service';
import { I<%= h.changeCase.pascal(name) %> } from 'src/models/<%= h.changeCase.paramCase(name) %>.model';

export const <%= h.changeCase.camel(name) %>ActionTypes = {
  <%= h.changeCase.constant(name) %>_DATA_READ: '<%= h.changeCase.constant(name) %>_DATA_READ',
  <%= h.changeCase.constant(name) %>_LIST_READ: '<%= h.changeCase.constant(name) %>_LIST_READ',
  <%= h.changeCase.constant(name) %>_DATA_CREATE: '<%= h.changeCase.constant(name) %>_DATA_CREATE',
  <%= h.changeCase.constant(name) %>_DATA_UPDATE: '<%= h.changeCase.constant(name) %>_DATA_UPDATE',
  <%= h.changeCase.constant(name) %>_DATA_DELETE: '<%= h.changeCase.constant(name) %>_DATA_DELETE',
  <%= h.changeCase.constant(name) %>_DATA_SET: '<%= h.changeCase.constant(name) %>_DATA_SET',
} as const;

export const duckActions = {
  // These are async actions that has promise response on event queue
  dataGET: {
    type: <%= h.changeCase.camel(name) %>ActionTypes.<%= h.changeCase.constant(name) %>_DATA_READ,
    service: services.dataGET,
  },

  listGET: {
    type: <%= h.changeCase.camel(name) %>ActionTypes.<%= h.changeCase.constant(name) %>_LIST_READ,
    service: services.listGET,
  },

  createPOST: {
    type: <%= h.changeCase.camel(name) %>ActionTypes.<%= h.changeCase.constant(name) %>_DATA_CREATE,
    service: services.createPOST,
    meta: {
      error: false, // Overrides default error handler if you want to have custom error message
    },
  },

  updatePUT: {
    type: <%= h.changeCase.camel(name) %>ActionTypes.<%= h.changeCase.constant(name) %>_DATA_UPDATE,
    service: services.updatePUT,
  },

  dataDELETE: {
    type: <%= h.changeCase.camel(name) %>ActionTypes.<%= h.changeCase.constant(name) %>_DATA_DELETE,
    service: services.dataDELETE,
  },

  // This is a sync action
  setData: (<%= h.changeCase.camel(name) %>: I<%= h.changeCase.pascal(name) %>) => ({
    type: <%= h.changeCase.camel(name) %>ActionTypes.<%= h.changeCase.constant(name) %>_DATA_SET,
    payload: {
      <%= h.changeCase.camel(name) %>
    },
  }),
};

export type I<%= h.changeCase.pascal(name) %>Async = typeof duckActions;

export interface I<%= h.changeCase.pascal(name) %>State extends ICommonState<typeof <%= h.changeCase.camel(name) %>ActionTypes> {
  data?: I<%= h.changeCase.pascal(name) %>;
  list: I<%= h.changeCase.pascal(name) %>[];
  total: number;
}

export const defaultState: I<%= h.changeCase.pascal(name) %>State = {
  status: {},
  list: [],
  total: 0,
};

const <%= h.changeCase.pascal(name) %>Reducer = (
  state: I<%= h.changeCase.pascal(name) %>State,
  action: IReducerAction<I<%= h.changeCase.pascal(name) %>Async>
): I<%= h.changeCase.pascal(name) %>State => {
  switch (action.type) {
    case <%= h.changeCase.camel(name) %>ActionTypes.<%= h.changeCase.constant(name) %>_DATA_SET:
    case <%= h.changeCase.camel(name) %>ActionTypes.<%= h.changeCase.constant(name) %>_DATA_READ:
    case <%= h.changeCase.camel(name) %>ActionTypes.<%= h.changeCase.constant(name) %>_DATA_UPDATE:
    case <%= h.changeCase.camel(name) %>ActionTypes.<%= h.changeCase.constant(name) %>_DATA_CREATE: {
      return {
        ...state,
        data: action.payload?.<%= h.changeCase.camel(name) %>,
      };
    }

    case <%= h.changeCase.camel(name) %>ActionTypes.<%= h.changeCase.constant(name) %>_LIST_READ: {
      return {
        ...state,
        list: action.payload?.rows ?? [],
        total: action.payload?.count ?? 0,
      };
    }

    case <%= h.changeCase.camel(name) %>ActionTypes.<%= h.changeCase.constant(name) %>_DATA_DELETE: {
      if (action.params) {
        const [id] = action.params;
        const list = state.list.filter((value) => value.id !== id);

        return {
          ...state,
          data: undefined,
          total: state.total - (state.list.length - list.length),
          list,
        };
      }

      return state;
    }

    default: {
      return state;
    }
  }
};

export default <%= h.changeCase.pascal(name) %>Reducer;
