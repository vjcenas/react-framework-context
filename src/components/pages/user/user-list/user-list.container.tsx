import React, { useEffect } from 'react';
import { useUserContext } from 'src/contexts/user.context';
import UserListView from './user-list.view';

const UserListContainer: React.FC = () => {
  const { state, actions } = useUserContext();

  useEffect(() => {
    actions.listGET();
  }, [actions]);

  return <UserListView data={state.list} />;
};

export default UserListContainer;
