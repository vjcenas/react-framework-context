---
to: src/selectors/<%= h.changeCase.paramCase(name) %>.selector.ts
---

import { <%= h.changeCase.camel(name) %>ActionTypes, I<%= h.changeCase.pascal(name) %>State } from 'src/ducks/<%= h.changeCase.paramCase(name) %>.duck';
import { IStatus } from 'src/libraries/thunk.library';

export const get<%= h.changeCase.pascal(name) %>Status = (
  state: I<%= h.changeCase.pascal(name) %>State,
  action: keyof typeof <%= h.changeCase.camel(name) %>ActionTypes
): IStatus =>
  state.status[action] ?? {
    fetching: false,
    error: null,
  };
