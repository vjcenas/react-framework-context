import React, { useEffect, useCallback } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useUserContext } from 'src/contexts/user.context';
import UserDetailView from './user-detail.view';

type IProps = RouteComponentProps<{
  id: string;
}>;

const UserDetailContainer: React.FC<IProps> = (props) => {
  const userId = Number(props.match.params.id);
  const { state, actions } = useUserContext();

  useEffect(() => {
    actions.dataGET(userId);
  }, [actions, userId]);

  const handleAge = useCallback(() => {
    actions.addAge(1);
  }, [actions]);

  if (!state.data) {
    return null;
  }

  return <UserDetailView data={state.data} handleAge={handleAge} />;
};

export default UserDetailContainer;
