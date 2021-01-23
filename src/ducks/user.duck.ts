import services from 'src/services/user.service';
import { IUser } from 'src/models/user.model';
import { ICommonState, IReducerAction } from 'src/libraries/thunk.library';

export const actionTypes = {
  USER_DATA_FETCH: 'USER_DATA_FETCH',
  USER_LIST_FETCH: 'USER_LIST_FETCH',
  USER_ADD_AGE: 'USER_ADD_AGE',
} as const;

// This is where we put the actions that have promise/async payload like HTTP request
export const asyncActions = {
  dataGET: {
    type: actionTypes.USER_DATA_FETCH,
    service: services.dataGET,
  },
  listGET: {
    type: actionTypes.USER_LIST_FETCH,
    service: services.listGET,
  },
};

// This is where we put the actions that doesn't have any promise/async payload
export const syncActions = {
  addAge: (age: number) => ({
    type: actionTypes.USER_ADD_AGE,
    payload: age,
  }),
};

export type IUserState = ICommonState<typeof actionTypes> & {
  data?: IUser;
  list: IUser[];
};

export const defaultState: IUserState = {
  status: {},
  list: [],
};

const UserReducer = (
  state = defaultState,
  action: IReducerAction<typeof asyncActions & typeof syncActions>
): IUserState => {
  switch (action.type) {
    case actionTypes.USER_DATA_FETCH: {
      return {
        ...state,
        data: action.payload,
      };
    }

    case actionTypes.USER_LIST_FETCH: {
      return {
        ...state,
        list: action.payload ?? [],
      };
    }

    case actionTypes.USER_ADD_AGE: {
      return {
        ...state,
        data: {
          ...(state.data as IUser),
          age: Number(state.data?.age ?? 0) + Number(action.payload),
        },
      };
    }

    default: {
      return state;
    }
  }
};

export default UserReducer;
