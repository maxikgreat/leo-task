import React, { VFC } from 'react';
import { UserType } from '../../App';

interface UserProps {
  user: UserType
}

const User: VFC<UserProps> = ({ user }) => {
  return (
    <li>
      <strong>{user.name}</strong> @{user.username}
    </li>
  );
};

export default User;
