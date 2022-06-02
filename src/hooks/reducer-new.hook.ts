import { useReducer, useMemo, useCallback, useRef } from 'react';
import { TYPE_FETCHING, TYPE_FETCHED, TYPE_ERROR } from 'src/constants';
import thunkFactory, {
  IReducerAction,
  IReturnActions,
} from 'src/libraries/thunk.library';
import useReducerLogger from 'src/hooks/reducer-logger.hook';

const useReducerHook = <
  R extends (state: S, action: IReducerAction<A>) => S,
  S,
  A
>(
  reducer: R,
  defaultState: S,
  actionList: A
): {
  state: S;
  actions: IReturnActions<A>;
} => {
  const actionsRef = useRef(actionList);

  // Initializing reducer
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
                error: action.payload,
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
  const actions = useMemo(
    () => thunkFactory(actionsRef.current, dispatch),
    [actionsRef, dispatch]
  );

  return { state, actions };
};

export default useReducerHook;
