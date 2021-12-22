import React from 'react';
import { Link } from 'react-router-dom';
import { GetUsersRequestParams } from '../../api';
import { userFromDto } from '../../domain/User';
import { useSortField } from '../../hooks/useSortField';
import { useGetUsersQuery } from '../../queries';
import { Table } from '../common/Table';
import TableHeader from '../common/TableHeader';

export default function UsersTable() {
  const { sortField, sortOrder, updateSorting } = useSortField<GetUsersRequestParams['sortField']>('name');

  const usersQuery = useGetUsersQuery({ sortField: sortField, sortOrder: sortOrder });

  if (usersQuery.status !== 'success') {
    return <p>Loading...</p>;
  }

  const users = usersQuery.data.map(userFromDto);

  return (
    <Table>
      <thead>
        <tr>
          <TableHeader
            sortable={true}
            sortOrder={sortField === 'name' ? sortOrder : undefined}
            onClick={() => updateSorting('name')}
          >
            Name
          </TableHeader>
          <TableHeader
            sortable={true}
            sortOrder={sortField === 'role' ? sortOrder : undefined}
            onClick={() => updateSorting('role')}
          >
            Role
          </TableHeader>
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
