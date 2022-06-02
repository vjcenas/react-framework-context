import React, { createContext, useContext } from 'react';
import useReducerHook from 'src/hooks/reducer.hook';
import UserReducer, {
  IUserState,
  defaultState,
  duckActions,
} from 'src/ducks/user.duck';

const useReducer = (state = {}) => {
  return useReducerHook(
    UserReducer,
    {
      ...defaultState,
      ...state,
    },
    duckActions
  );
};

type IUserContext = ReturnType<typeof useReducer>;

const UserContext = createContext<Partial<IUserContext>>({
  state: defaultState,
}) as React.Context<IUserContext>;

type IProps = {
  state?: Partial<IUserState>;
};

const UserProvider: React.FC<IProps> = ({ children, state }) => {
  const reducer = useReducer(state);

  return (
    <UserContext.Provider
      value={{
        ...reducer,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

const useUserContext = () => useContext(UserContext);

export type IUseUserContext = ReturnType<typeof useUserContext>;

export { UserContext, UserProvider, useUserContext };
