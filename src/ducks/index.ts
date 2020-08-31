import { TYPE_FETCHING, TYPE_FETCHED, TYPE_ERROR } from '../constants';

export interface IStatus {
  error: any;
  fetching: boolean;
}

export type IThunkStatus<T> = {
  [key in keyof T]?: IStatus;
};

export interface ICustomAction<C, P = never, S = never> {
  type: C;
  payload?: P;
  status: S;
}
export type ICommonState<T> = { status: IThunkStatus<T> };
export type ICommonAction<T> = T;

export type IAsyncAction<C, T> =
  | ICustomAction<C, never, TYPE_FETCHING>
  | ICustomAction<C, T, TYPE_FETCHED>
  | ICustomAction<C, Error, TYPE_ERROR>;

export type IReturnPromise<T> = T extends Promise<infer U> ? U : T;
