import React, { createContext, useContext } from 'react';
import useReducerHook from 'src/hooks/reducer.hook';
import UserReducer, {
  defaultState,
  asyncActions,
  syncActions,
} from '../ducks/user.duck';

// We need to do this, to be able to get the typings of the Reducer
const Reducer = () => {
  return useReducerHook(UserReducer, defaultState, {
    ...asyncActions,
    ...syncActions,
  });
};

type IUserContext = ReturnType<typeof Reducer>;

const UserContext = createContext<Partial<IUserContext>>({
  state: defaultState,
}) as React.Context<IUserContext>;

export const UserProvider: React.FC<{ value?: Partial<IUserContext> }> = ({
  value,
  children,
}) => {
  const reducer = Reducer();

  return (
    <UserContext.Provider
      value={{
        ...reducer,
        ...value,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

// We create context hook here so that we can able to unit test
// container components that uses this context
export const useUserContext = () => useContext(UserContext);

export type IUseUserContext = ReturnType<typeof useUserContext>;

export default UserContext;
