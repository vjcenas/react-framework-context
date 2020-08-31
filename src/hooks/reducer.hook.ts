import { useReducer, useMemo, useCallback, useRef } from 'react';
import { TYPE_FETCHING, TYPE_FETCHED, TYPE_ERROR } from '../constants';
import thunkFactory, {
  IThunkActionReturn,
  ISyncActionReturn,
} from '../libraries/thunk.library';
import useReducerLogger from './reducer-logger.hook';
import UserReducer, {
  IUserState,
  IUserAsync,
  IUserSync,
} from '../ducks/user.duck';

// Overloading TypeScript Functions for useReducerHook this means that
// every Reducer created must also create a overloading function here
function useReducerHook<S = IUserState>(
  reducer: typeof UserReducer,
  defaultState: S,
  actions: IUserAsync & IUserSync
): {
  state: S;
  actions: IThunkActionReturn<IUserAsync> & ISyncActionReturn<IUserSync>;
};

function useReducerHook(reducer, defaultState, actionList) {
  // Memoized actions
  const actionsRef = useRef(actionList);

  // Prevents reinitializing reducer
  const customReducer = useCallback(
    (state, action) => {
      switch (action.status) {
        case TYPE_FETCHING:
          return {
            ...state,
            status: {
              ...state.status,
              [action.type]: {
                fetching: true,
                error: null,
              },
            },
          };
        case TYPE_FETCHED:
          // Updates the main reducer state
          return {
            ...reducer(
              {
                ...state,
                status: {
                  ...state.status,
                  [action.type]: {
                    fetching: false,
                    error: null,
                  },
                },
              },
              action
            ),
          };
        case TYPE_ERROR:
          return {
            ...state,
            status: {
              ...state.status,
              [action.type]: {
                fetching: false,
                error: (action.payload as Error).message || action.payload,
              },
            },
          };
        default:
          // For sync actions
          return {
            ...state,
            ...reducer(state, action),
          };
      }
    },
    [reducer]
  );

  const [state, dispatch] = useReducer(
    useReducerLogger(customReducer),
    defaultState
  );

  // Memoized all the actions returned from the factory
  const actions = useMemo(() => thunkFactory(actionsRef.current, dispatch), [
    actionsRef,
    dispatch,
  ]);

  return { state, actions };
}

export default useReducerHook;
