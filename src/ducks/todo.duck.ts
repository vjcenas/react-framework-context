import services from 'src/services/todo.service';
import { ITodo } from 'src/models/todo.model';
import { ICommonState, IReducerAction } from 'src/libraries/thunk.library';

export const actionTypes = {
  TODO_DATA_FETCH: 'TODO_DATA_FETCH',
  TODO_LIST_FETCH: 'TODO_LIST_FETCH',
  TODO_LIST_BY_USER_FETCH: 'TODO_LIST_BY_USER_FETCH',
} as const;

// This is where we put the actions that have promise/async payload like HTTP request
export const duckActions = {
  dataGET: {
    type: actionTypes.TODO_DATA_FETCH,
    service: services.dataGET,
  },
  listGET: {
    type: actionTypes.TODO_LIST_FETCH,
    service: services.listGET,
  },

  listByUserIdGET: {
    type: actionTypes.TODO_LIST_BY_USER_FETCH,
    service: services.listByUserIdGET,
  },
};

export type ITodoState = ICommonState<typeof actionTypes> & {
  data?: ITodo;
  list: ITodo[];
};

export const defaultState: ITodoState = {
  status: {},
  list: [],
};

const TodoReducer = (
  state = defaultState,
  action: IReducerAction<typeof duckActions>
): ITodoState => {
  switch (action.type) {
    case actionTypes.TODO_DATA_FETCH: {
      return {
        ...state,
        data: action.payload,
      };
    }

    case actionTypes.TODO_LIST_BY_USER_FETCH:
    case actionTypes.TODO_LIST_FETCH: {
      return {
        ...state,
        list: action.payload ?? [],
      };
    }

    default: {
      return state;
    }
  }
};

export default TodoReducer;
