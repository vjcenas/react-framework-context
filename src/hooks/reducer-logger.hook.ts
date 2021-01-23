import { useCallback } from 'react';

const useReducerLogger = (reducer) =>
  useCallback(
    (state, action) => {
      const next = reducer(state, action);

      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.log(
          '%cPrevious State:',
          'color: #9E9E9E; font-weight: 700;',
          state
        );

        // eslint-disable-next-line no-console
        console.log('%cAction:', 'color: #00A7F7; font-weight: 700;', action);

        // eslint-disable-next-line no-console
        console.log('%cNext State:', 'color: #47B04B; font-weight: 700;', next);
      }

      return next;
    },
    [reducer]
  );

export default useReducerLogger;
