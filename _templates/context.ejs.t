---
to: src/contexts/<%= h.changeCase.paramCase(name) %>.context.tsx
---

import React, { createContext, useContext } from 'react';
import useReducerHook from 'src/hooks/reducer.hook';
import <%= h.changeCase.pascal(name) %>Reducer, {
  I<%= h.changeCase.pascal(name) %>State,
  defaultState,
  duckActions,
} from 'src/ducks/<%= h.changeCase.paramCase(name) %>.duck';

const useReducer = (state = {}) => {
  return useReducerHook(
    <%= h.changeCase.pascal(name) %>Reducer,
    {
      ...defaultState,
      ...state,
    },
    duckActions
  );
};

type I<%= h.changeCase.pascal(name) %>Context = ReturnType<typeof useReducer>;

const <%= h.changeCase.pascal(name) %>Context = createContext<Partial<I<%= h.changeCase.pascal(name) %>Context>>({
  state: defaultState,
}) as React.Context<I<%= h.changeCase.pascal(name) %>Context>;

type IProps = {
  state?: Partial<I<%= h.changeCase.pascal(name) %>State>;
};

const <%= h.changeCase.pascal(name) %>Provider: React.FC<IProps> = ({ children, state }) => {
  const reducer = useReducer(state);

  return (
    <<%= h.changeCase.pascal(name) %>Context.Provider
      value={{
        ...reducer,
      }}
    >
      {children}
    </<%= h.changeCase.pascal(name) %>Context.Provider>
  );
};

const use<%= h.changeCase.pascal(name) %>Context = () => useContext(<%= h.changeCase.pascal(name) %>Context);

export type IUse<%= h.changeCase.pascal(name) %>Context = ReturnType<typeof use<%= h.changeCase.pascal(name) %>Context>;

export { <%= h.changeCase.pascal(name) %>Context, <%= h.changeCase.pascal(name) %>Provider, use<%= h.changeCase.pascal(name) %>Context };
