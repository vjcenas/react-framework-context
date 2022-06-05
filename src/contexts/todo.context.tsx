import React, { createContext, useContext } from 'react';
import useReducerHook from 'src/hooks/reducer.hook';
import TodoReducer, {
  ITodoState,
  defaultState,
  duckActions,
} from 'src/ducks/todo.duck';

const useReducer = (state = {}) => {
  return useReducerHook(
    TodoReducer,
    {
      ...defaultState,
      ...state,
    },
    duckActions
  );
};

type ITodoContext = ReturnType<typeof useReducer>;

const TodoContext = createContext<Partial<ITodoContext>>({
  state: defaultState,
}) as React.Context<ITodoContext>;

type IProps = {
  state?: Partial<ITodoState>;
};

const TodoProvider: React.FC<IProps> = ({ children, state }) => {
  const reducer = useReducer(state);

  return (
    <TodoContext.Provider
      value={{
        ...reducer,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

const useTodoContext = () => useContext(TodoContext);

export type IUseTodoContext = ReturnType<typeof useTodoContext>;

export { TodoContext, TodoProvider, useTodoContext };
