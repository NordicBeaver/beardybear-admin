import React from 'react';
import { Link } from 'react-router-dom';
import { userFromDto } from '../../domain/User';
import { useGetUsersQuery } from '../../queries';
import { Table } from '../common/Table';

export default function UsersTable() {
  const usersQuery = useGetUsersQuery();

  if (usersQuery.status !== 'success') {
    return <p>Loading...</p>;
  }

  const users = usersQuery.data.map(userFromDto);

  return (
    <Table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Role</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>
              <Link to={`/users/${user.id}`}>{user.name}</Link>
            </td>
            <td>{user.role}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
