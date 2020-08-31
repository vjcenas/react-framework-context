import React from 'react';
import { IUser } from 'src/models/user.model';
import { Link } from 'react-router-dom';

type IProps = {
  data: IUser[];
};

const UserListView: React.FC<IProps> = ({ data }) => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Fullname</th>
            <th>Email</th>
            <th>Username</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user, key) => (
            <tr key={key}>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td>{user.email}</td>
              <td>{user.username}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserListView;
