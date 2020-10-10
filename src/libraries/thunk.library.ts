import { Dispatch } from 'react';
import { TYPE_FETCHING, TYPE_ERROR, TYPE_FETCHED } from 'src/constants';
import { IReturnPromise, ICustomAction } from 'src/ducks';

export const thunkCreator = async <C extends string, T>(
  actionType: C,
  service: (dispatch: Dispatch<any>) => Promise<T>,
  dispatch: Dispatch<any>
) => {
  dispatch({
    type: actionType,
    status: TYPE_FETCHING,
  });

  try {
    const response = await service(dispatch);
    dispatch({
      type: actionType,
      status: TYPE_FETCHED,
      payload: response,
    });

    return { payload: response };
  } catch (error) {
    dispatch({
      type: actionType,
      status: TYPE_ERROR,
      payload: error.data || error,
    });

    return { error: error.data || error };
  }
};

type IThunkReturn<T> =
  | { payload: T; error?: never }
  | { payload?: never; error: any };

type IMeta = {
  error?: boolean | ((error) => string);
};

type IAsyncThunk = Record<
  string,
  {
    type: string;
    service: (...args: any[]) => any;
    meta?: IMeta;
  }
>;

export type IAsyncActionReturn<T extends IAsyncThunk> = {
  [K in keyof T]: (
    ...args: Parameters<T[K]['service']>
  ) => Promise<IThunkReturn<IReturnPromise<ReturnType<T[K]['service']>>>>;
};

type ISyncThunk = Record<
  string,
  (
    ...args: any[]
  ) => {
    type: string;
    payload?: any;
  }
>;

export type ISyncActionReturn<T extends ISyncThunk> = {
  [K in keyof T]: (...args: Parameters<T[K]>) => ReturnType<T[K]>;
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

type IHybridThunk = Record<string, IAsyncThunk[string] | ISyncThunk[string]>;

export type IHybridActionReturn<T> = {
  [K in keyof T]: T[K] extends IAsyncThunk[string]
    ? (
        ...args: Parameters<T[K]['service']>
      ) => Promise<IThunkReturn<IReturnPromise<ReturnType<T[K]['service']>>>>
    : T[K] extends ISyncThunk[string]
    ? (...args: Parameters<T[K]>) => ReturnType<T[K]>
    : never;
};

type IReturnActions<T> = T extends IAsyncThunk
  ? IAsyncActionReturn<T>
  : T extends ISyncThunk
  ? ISyncActionReturn<T>
  : IHybridActionReturn<T>;

interface IThunkFactory {
  <T extends IHybridThunk>(actions: T, dispatch: Dispatch<any>): IReturnActions<
    T
  >;

  <T extends IAsyncThunk>(actions: T, dispatch: Dispatch<any>): IReturnActions<
    T
  >;

  <T extends ISyncThunk>(actions: T, dispatch: Dispatch<any>): IReturnActions<
    T
  >;
}

const thunkFactory: IThunkFactory = (actions, dispatch) => {
  return Object.keys(actions).reduce((thunks, key: keyof typeof actions) => {
    const action = actions[key];

    return {
      ...thunks,
      [key]: (...args) => {
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
  }, {});
};

export default thunkFactory;
