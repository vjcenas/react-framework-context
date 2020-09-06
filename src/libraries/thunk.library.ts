import { Dispatch } from 'react';
import { TYPE_FETCHING, TYPE_ERROR, TYPE_FETCHED } from 'src/constants';
import { IReturnPromise, ICustomAction } from 'src/ducks';

export const thunkCreator = async <C extends string, T>(
  actionType: C,
  service,
  dispatch: Dispatch<any>
) => {
  dispatch({
    type: actionType,
    status: TYPE_FETCHING,
  });
  try {
    const res = await service(dispatch);
    dispatch({
      type: actionType,
      status: TYPE_FETCHED,
      payload: res as T,
    });

    return { payload: res as T };
  } catch (error) {
    dispatch({
      type: actionType,
      status: TYPE_ERROR,
      payload: error,
    });

    return { error };
  }
};

type IThunkReturn<T> =
  | { payload: T; error?: never }
  | { payload?: never; error: any };

export type IAsyncThunk = Record<
  string,
  {
    type: string;
    service: (...args: any[]) => any;
  }
>;

export type IThunkActionReturn<T extends IAsyncThunk> = {
  [K in keyof T]: (
    ...args: Parameters<T[K]['service']>
  ) => Promise<IThunkReturn<IReturnPromise<ReturnType<T[K]['service']>>>>;
};

export type ISyncThunk = Record<
  string,
  (
    ...args: any[]
  ) => {
    type: string;
    payload?: any;
  }
>;

export type ISyncActionReturn<T extends ISyncThunk> = {
  [k in keyof T]: (...args: Parameters<T[k]>) => ReturnType<T[k]>;
};

export type IAsyncActions<T extends IAsyncThunk> = {
  [key in keyof T]: ICustomAction<
    T[key]['type'],
    IReturnPromise<ReturnType<T[key]['service']>>
  >;
}[keyof T];

export type ISyncActions<T extends ISyncThunk> = {
  [key in keyof T]: ICustomAction<
    ReturnType<T[key]>['type'],
    ReturnType<T[key]>['payload']
  >;
}[keyof T];

type IReturnActions<T> = T extends IAsyncThunk
  ? IThunkActionReturn<T>
  : T extends ISyncThunk
  ? ISyncActionReturn<T>
  : never;

function thunkFactory<T extends IAsyncThunk & ISyncThunk>(
  actions: T,
  dispatch: Dispatch<any>
) {
  return Object.keys(actions).reduce((thunks, key: keyof typeof actions) => {
    const action = actions[key];

    return {
      ...thunks,
      [key]: async (...args) => {
        if (typeof action === 'function') {
          return dispatch(action(...args));
        }
        return thunkCreator(
          action.type,
          () => action.service(...args),
          dispatch
        );
      },
    };
  }, {}) as IReturnActions<T>;
}

export default thunkFactory;
