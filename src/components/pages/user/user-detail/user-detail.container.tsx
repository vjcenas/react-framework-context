import React, { useEffect, useCallback } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useTodoContext } from 'src/contexts/todo.context';
import { useUserContext } from 'src/contexts/user.context';
import UserDetailView from './user-detail.view';

type IProps = RouteComponentProps<{
  id: string;
}>;

const UserDetailContainer: React.FC<IProps> = ({ match }) => {
  const userId = Number(match.params.id);
  const { state, actions } = useUserContext();
  const { state: todoState, actions: todoActions } = useTodoContext();

  useEffect(() => {
    actions.dataGET(userId);
    todoActions.listByUserIdGET(userId);
  }, [actions, todoActions, userId]);

  const handleAge = useCallback(() => {
    actions.addAge(1);
  }, [actions]);

  if (!state.data) {
    return null;
  }

  return (
    <UserDetailView
      user={state.data}
      todos={todoState.list}
      handleAge={handleAge}
    />
  );
};

export default UserDetailContainer;
