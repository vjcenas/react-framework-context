import React, { createContext, useContext } from 'react';
import useReducerHook from 'src/hooks/reducer.hook';
import TodoReducer, { defaultState, asyncActions } from 'src/ducks/todo.duck';

// We need to do this, to be able to get the typings of the Reducer
const Reducer = () => {
  return useReducerHook(TodoReducer, defaultState, asyncActions);
};

type ITodoContext = ReturnType<typeof Reducer>;

const TodoContext = createContext<Partial<ITodoContext>>({
  state: defaultState,
}) as React.Context<ITodoContext>;

export const TodoProvider: React.FC<{ value?: Partial<ITodoContext> }> = ({
  value,
  children,
}) => {
  const reducer = Reducer();

  return (
    <TodoContext.Provider
      value={{
        ...reducer,
        ...value,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

// We create context hook here so that we can able to unit test
// container components that uses this context
export const useTodoContext = () => useContext(TodoContext);

export type IUseTodoContext = ReturnType<typeof useTodoContext>;

export default TodoContext;
