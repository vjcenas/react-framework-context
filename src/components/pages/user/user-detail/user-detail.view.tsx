import React from 'react';
import { IUser } from 'src/models/user.model';
import { Link } from 'react-router-dom';
import Button from 'src/components/atoms/button/button.container';
import { ITodo } from 'src/models/todo.model';

type IProps = {
  user: IUser;
  todos: ITodo[];
  handleAge: () => void;
};

const UserDetailView: React.FC<IProps> = ({ user, todos, handleAge }) => {
  return (
    <div>
      <Link to="/users">Back</Link>
      <h1>{user.name}</h1>

      <address>{`${user.address.street}, ${user.address.city}`}</address>

      <strong>{user.age}</strong>

      <Button onClick={handleAge}>Add Age</Button>

      <ul>
        {todos.map((value) => (
          <li key={value.id}>{value.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserDetailView;
