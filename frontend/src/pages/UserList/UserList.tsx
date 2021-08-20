import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Default from '../../layouts/Default/Default';
import DataTable, { DataTableColumn } from '../../components/DataTable/DataTable';
import Button from '../../components/Button/Button';
import Loader from '../../components/Loader/Loader';
import api from '../../services/api';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

const UserList: React.FC = () => {
  const history = useHistory();
  const [loading, setLoading] = useState<boolean>(false);
  const [users, setUsers] = useState<User[]>([] as User[]);

  useEffect(() => {
    const loadUsers = async (): Promise<void> => {
      try {
        setLoading(true);
        const response = await api.get('/user');
        setUsers(response.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    loadUsers();
  }, [history]);

  const columns: DataTableColumn[] = [
    {
      field: 'id',
      text: 'ID',
      hide: true,
    },
    {
      field: 'name',
      text: 'Name',
    },
    {
      field: 'email',
      text: 'Email',
    },
    {
      field: 'role',
      text: 'Role',
      formatter: (row: any) => row.role.charAt(0).toUpperCase() + row.role.slice(1),
    },
  ];

  const addUser = useCallback(() => {
    history.push('/users/new');
  }, [history]);

  const openUser = useCallback((row: any) => {
    history.push(`/users/${row.id}`);
  }, [users]);

  return (
    <Default>
      {
        loading
        && <Loader />
      }

      <DataTable
        title="Users"
        keyField="id"
        columns={columns}
        data={users}
        tools={(
          <>
            <Button
              type="button"
              variant="primary"
              onClick={addUser}
            >
              Add
            </Button>
          </>
        )}
        onRowClick={openUser}
      />
    </Default>
  );
};

export default UserList;
