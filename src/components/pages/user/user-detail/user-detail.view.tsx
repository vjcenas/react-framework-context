import React from 'react';
import { IUser } from 'src/models/user.model';
import { Link } from 'react-router-dom';
import Button from 'src/components/atoms/button/button.container';

type IProps = {
  data: IUser;
  handleAge: () => void;
};

const UserDetailView: React.FC<IProps> = ({ data, handleAge }) => {
  return (
    <div>
      <Link to="/users">Back</Link>
      <h1>{data.name}</h1>

      <address>{`${data.address.street}, ${data.address.city}`}</address>

      <strong>{data.age}</strong>

      <Button onClick={handleAge}>Add Age</Button>
    </div>
  );
};

export default UserDetailView;
